"""Scrape the batomon.com wiki catalog into JSON + download images.
Usage: python3 -I scrape.py <raw_cache_dir> <out_data_dir> <out_images_dir>
"""
import html, json, os, re, sys, time, urllib.request, urllib.parse

RAW, OUT, IMG = sys.argv[1], sys.argv[2], sys.argv[3]
BASE = "https://batomon.com"
UA = {"User-Agent": "Mozilla/5.0 (fan-wiki-translation)"}
os.makedirs(RAW, exist_ok=True); os.makedirs(OUT, exist_ok=True)


def get(path, binary=False):
    fn = os.path.join(RAW, re.sub(r"[^a-zA-Z0-9_.-]", "_", path.strip("/")) or "index")
    if binary:
        fn = None
    if fn and os.path.exists(fn):
        return open(fn, encoding="utf-8").read()
    req = urllib.request.Request(BASE + urllib.parse.quote(path), headers=UA)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
            break
        except Exception as e:  # noqa
            print("retry", path, e); time.sleep(2)
    else:
        raise RuntimeError(path)
    time.sleep(0.25)
    if binary:
        return data
    txt = data.decode("utf-8")
    open(fn, "w", encoding="utf-8").write(txt)
    return txt


def clean(s):
    s = re.sub(r"<[^>]+>", "", s)
    return html.unescape(s).strip()


def parse_list(page):
    s = get("/" + page)
    out = []
    for li in re.findall(r'<li class="catalog-entry"(.*?)</li>', s, flags=re.S):
        attrs = json.loads(html.unescape(re.search(r'data-attributes="([^"]*)"', li).group(1)))
        regions = json.loads(html.unescape(re.search(r'data-regions="([^"]*)"', li).group(1)))
        img = re.search(r'<img src="([^"]+)"', li).group(1)
        a = re.search(r'<h2><a href="/[^/]+/([^"]+)">(.*?)</a></h2>', li)
        chips = [clean(c) for c in re.findall(r'<span class="chip">(.*?)</span>', li)]
        ps = re.findall(r'<p( class="muted")?>(.*?)</p>', li, flags=re.S)
        desc = [clean(p) for m, p in ps if not m]
        out.append({
            "slug": a.group(1), "name": clean(a.group(2)), "image": img,
            "chips": chips, "attributes": attrs, "regions": regions,
            "text": " ".join(desc),
        })
    return out


def dl_image(src):
    # src like /game/26572818/monster/foo.png  -> IMG/monster/foo.png
    parts = src.split("/")
    cat, name = parts[-2], parts[-1].replace(" ", "_")
    dest_dir = os.path.join(IMG, cat); os.makedirs(dest_dir, exist_ok=True)
    dest = os.path.join(dest_dir, name)
    if not os.path.exists(dest):
        data = get(src, binary=True)
        if not data.startswith(b"\x89PNG"):
            print("WARN not png", src); return None
        open(dest, "wb").write(data)
    return f"/images/{cat}/{name}"


RARITIES = ["Common", "Uncommon", "Rare", "Super Rare", "Legendary", "Mythical"]

# ---------- Batomon ----------
lst = parse_list("batomon")
hover_meta = json.loads(re.search(r'id="batomon-hover-data">(.*?)</script>', get("/batomon"), flags=re.S).group(1))
hover = json.loads(get(hover_meta["path"]))
by_href = {v["href"]: v for v in hover["species"].values()}

batomon = []
for e in lst:
    h = by_href.get(f"/batomon/{e['slug']}")
    d = get(f"/batomon/{e['slug']}")
    main = re.search(r"<main.*?</main>", d, flags=re.S).group(0)
    txt = [l.strip() for l in html.unescape(re.sub(r"<[^>]+>", "\n", re.sub(r"<(script|style).*?</\1>", "", main, flags=re.S))).split("\n") if l.strip()]
    evo_from = evo_into = None
    for i, l in enumerate(txt):
        if l == "Evolves from" and evo_from is None:
            evo_from = {"name": txt[i + 1], "level": txt[i + 2].replace("at level", "").strip()}
        if l == "Evolves into" and evo_into is None:
            evo_into = {"name": txt[i + 1], "level": txt[i + 2].replace("at level", "").strip()}
    cost = next((c for c in e["chips"] if c.endswith(" gold")), None)
    rarity = next((c for c in e["chips"] if c in RARITIES), None)
    b = {
        "slug": e["slug"], "name": e["name"], "rarity": rarity,
        "types": [c for c in e["chips"] if c not in RARITIES and not c.endswith(" gold")],
        "cost": int(cost.split()[0]) if cost else None,
        "regions": e["regions"], "summary": e["text"],
        "image": dl_image(e["image"]),
        "evolvesFrom": evo_from, "evolvesInto": evo_into,
    }
    if h:
        b["tier"] = h.get("tier")
        b["shinyImage"] = dl_image(h["shinySprite"]) if h.get("shinySprite") else None
        b["levels"] = h["levels"]; b["shinyLevels"] = h.get("shinyLevels")
    batomon.append(b)
    print("batomon", b["slug"])
json.dump(batomon, open(os.path.join(OUT, "batomon.json"), "w"), ensure_ascii=False, indent=1)

# ---------- Trainers / Trinkets / Items ----------
for page, cat in [("trainers", "trainer"), ("trinkets", "trinket"), ("items", "item")]:
    rows = []
    for e in parse_list(page):
        cost = next((c for c in e["chips"] if c.endswith(" gold")), None)
        rows.append({
            "slug": e["slug"], "name": e["name"], "image": dl_image(e["image"]),
            "rarity": next((c for c in e["chips"] if c in RARITIES), None),
            "attributes": e["attributes"], "regions": e["regions"],
            "cost": int(cost.split()[0]) if cost else None,
            "text": e["text"],
        })
    json.dump(rows, open(os.path.join(OUT, f"{page}.json"), "w"), ensure_ascii=False, indent=1)
    print(page, len(rows))

# ---------- Events ----------
events = []
for e in parse_list("events"):
    d = get(f"/events/{e['slug']}")
    sec = re.search(r'<h2>Encounter options</h2>(.*?)</section>', d, flags=re.S)
    opts, requirement = [], None
    if sec:
        body = sec.group(1)
        req = re.match(r'\s*<p>(.*?)</p>', body, flags=re.S)
        requirement = clean(req.group(1)) if req else None
        for li in re.findall(r'<li>(.*?)</li>', body, flags=re.S):
            label = clean(re.search(r'<strong>(.*?)</strong>', li, flags=re.S).group(1))
            ps = [clean(x) for x in re.findall(r'<p>(.*?)</p>', li, flags=re.S)]
            opts.append({"label": label, "effect": ps[0] if ps else "", "notes": ps[1:]})
    tier = next((c for c in e["chips"] if c.startswith("Tier")), None)
    events.append({"slug": e["slug"], "name": e["name"], "image": dl_image(e["image"]),
                   "tier": int(tier.split()[1]) if tier else None, "text": e["text"], "requirement": requirement, "options": opts})
json.dump(events, open(os.path.join(OUT, "events.json"), "w"), ensure_ascii=False, indent=1)
print("events", len(events))

# ---------- Mechanics ----------
mlist = get("/mechanics")
slugs = sorted(set(re.findall(r'href="/mechanics/([^"#]+)"', mlist)))
mech = []
for slug in slugs:
    d = get(f"/mechanics/{slug}")
    title = clean(re.search(r"<h1>(.*?)</h1>", d, flags=re.S).group(1))
    lede = re.search(r'<p class="mechanics-lede">(.*?)</p>', d, flags=re.S)
    sections = []
    for sid in ("rules", "diagram"):
        m = re.search(rf'<section id="{sid}"[^>]*>(.*?)</section>', d, flags=re.S)
        if not m:
            continue
        body = re.sub(r"<svg.*?</svg>", "", m.group(1), flags=re.S)
        for block in re.split(r"(?=<h2)", body):
            h = re.search(r"<h2[^>]*>(.*?)</h2>", block, flags=re.S)
            if not h:
                continue
            items = [clean(x) for x in re.findall(r"<li[^>]*>(.*?)</li>", block, flags=re.S)]
            paras = [clean(x) for x in re.findall(r"<p[^>]*>(.*?)</p>", block, flags=re.S)]
            sections.append({"heading": clean(h.group(1)), "ordered": "<ol" in block,
                             "paragraphs": [p for p in paras if p], "items": [i for i in items if i]})
    mech.append({"slug": slug, "name": title, "summary": clean(lede.group(1)) if lede else "", "sections": sections})
    print("mech", slug, len(sections))
json.dump(mech, open(os.path.join(OUT, "mechanics.json"), "w"), ensure_ascii=False, indent=1)
print("done")
