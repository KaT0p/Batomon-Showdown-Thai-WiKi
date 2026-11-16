"""รวมข้อมูลที่ดึงมา (scripts/raw/*.json) กับไฟล์แปล (scripts/i18n/*.json)
แล้วเขียนผลลัพธ์ไปที่ src/data/*.json ให้ Next.js ใช้

วิธีใช้:  python3 scripts/build_data.py
ข้อความที่ยังไม่มีคำแปลจะถูกบันทึกไว้ที่ scripts/missing-translations.txt
"""
from __future__ import annotations
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "scripts", "raw")
I18N = os.path.join(ROOT, "scripts", "i18n")
OUT = os.path.join(ROOT, "src", "data")
os.makedirs(OUT, exist_ok=True)

NUM = re.compile(r"\d+(?:\.\d+)?")

TEMPLATES: dict[str, str] = {}
for f in ("batomon.json", "catalog.json", "events.json"):
    TEMPLATES.update(json.load(open(os.path.join(I18N, f), encoding="utf-8")))
MECH_TH = json.load(open(os.path.join(I18N, "mechanics.json"), encoding="utf-8"))

missing: set[str] = set()


def tr(text: str | None) -> str:
    """แปลข้อความโดยแทนตัวเลขด้วย {0},{1}… แล้วเติมตัวเลขกลับเข้าไปในคำแปล"""
    if not text:
        return ""
    nums: list[str] = []

    def repl(m: re.Match) -> str:
        nums.append(m.group(0))
        return "{%d}" % (len(nums) - 1)

    key = NUM.sub(repl, text)
    th = TEMPLATES.get(key)
    if th is None:
        missing.add(key)
        return text
    return re.sub(r"\{(\d+)\}", lambda m: nums[int(m.group(1))], th)


def load(name):
    return json.load(open(os.path.join(RAW, name), encoding="utf-8"))


def dump(name, data):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)


# ---------- Batomon ----------
batomon = load("batomon.json")
for b in batomon:
    b["summaryTh"] = tr(b.get("summary"))
    for key in ("levels", "shinyLevels"):
        for lv in b.get(key) or []:
            lv["textTh"] = tr(lv.get("text"))
    b.setdefault("shinyImage", None)
    b.setdefault("shinyLevels", None)
dump("batomon.json", batomon)

# ---------- Trainers / Trinkets / Items ----------
for name in ("trainers.json", "trinkets.json", "items.json"):
    rows = load(name)
    for r in rows:
        r["textTh"] = tr(r["text"])
    dump(name, rows)

# ---------- Events ----------
events = load("events.json")
for e in events:
    e["textTh"] = tr(e["text"])
    e["requirementTh"] = tr(e.get("requirement")) or None
    for o in e["options"]:
        o["labelTh"] = tr(o["label"])
        o["effectTh"] = tr(o["effect"])
        o["notesTh"] = [tr(n) for n in o.get("notes", [])]
dump("events.json", events)

# ---------- Mechanics ----------
mech = load("mechanics.json")
out = []
for m in mech:
    th = MECH_TH.get(m["slug"])
    if not th:
        missing.add(f"[mechanic] {m['slug']}")
        th = {"group": "battle", "name": m["name"], "summary": m["summary"], "sections": []}
    secs = []
    for i, s in enumerate(m["sections"]):
        ts = th["sections"][i] if i < len(th["sections"]) else {}
        items_th = ts.get("items", [])
        paras_th = ts.get("paragraphs", [])
        if len(items_th) != len(s["items"]) or len(paras_th) != len(s["paragraphs"]):
            missing.add(f"[mechanic] {m['slug']} section {i} ไม่ตรงกับต้นฉบับ")
        secs.append({
            "heading": s["heading"], "headingTh": ts.get("heading", s["heading"]),
            "ordered": s["ordered"],
            "paragraphs": s["paragraphs"], "paragraphsTh": paras_th or s["paragraphs"],
            "items": s["items"], "itemsTh": items_th or s["items"],
        })
    out.append({
        "slug": m["slug"], "name": m["name"], "nameTh": th["name"], "group": th["group"],
        "summary": m["summary"], "summaryTh": th["summary"], "sections": secs,
    })
dump("mechanics.json", out)

report = os.path.join(ROOT, "scripts", "missing-translations.txt")
with open(report, "w", encoding="utf-8") as f:
    f.write("\n".join(sorted(missing)))
print(f"เขียนข้อมูลแล้ว → src/data  |  ข้อความที่ยังไม่ได้แปล: {len(missing)} (ดู scripts/missing-translations.txt)")
