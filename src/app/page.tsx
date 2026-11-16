import Link from "next/link";
import { BALANCE_VERSION, batomon, events, items, mechanics, trainers, trinkets } from "@/lib/data";

const HERO = ["bambudo", "joltail", "scorchimp", "dewlotl", "shikitsune", "dragonarch"];

export default function HomePage() {
  const heroMons = HERO.map((s) => batomon.find((b) => b.slug === s)).filter(Boolean);

  const cats = [
    { href: "/batomon", title: "Batomon", count: `${batomon.length} ตัว`, img: batomon[0]?.image },
    { href: "/trainers", title: "เทรนเนอร์", count: `${trainers.length} คน`, img: trainers[1]?.image },
    { href: "/trinkets", title: "ทริงเก็ต", count: `${trinkets.length} ชิ้น`, img: trinkets[1]?.image },
    { href: "/items", title: "ไอเท็ม", count: `${items.length} ชิ้น`, img: items[0]?.image },
    { href: "/events", title: "อีเวนต์", count: `${events.length} เหตุการณ์`, img: events[0]?.image },
    { href: "/mechanics", title: "กลไกเกม", count: `${mechanics.length} หัวข้อ`, img: undefined },
  ];

  return (
    <>
      <section className="hero">
        <div>
          <h1>Batomon Showdown Wiki ภาษาไทย</h1>
          <p className="lede" style={{ marginBottom: 8 }}>
            รวมข้อมูล Batomon ทุกตัว เทรนเนอร์ ทริงเก็ต ไอเท็ม อีเวนต์ และกฎการต่อสู้แบบละเอียด ไว้ในที่เดียว
          </p>
          <div className="badges">
            <span className="badge gold">Balance {BALANCE_VERSION}</span>
            <span className="badge">แปลเป็นภาษาไทยทั้งหมด</span>
          </div>
        </div>
        <div className="hero-sprites" aria-hidden>
          {heroMons.map((b) => (
            <img key={b!.slug} className="pixel" src={b!.image} alt="" width={72} height={72} />
          ))}
        </div>
      </section>

      <h2>หมวดข้อมูลเกม</h2>
      <div className="grid grid-cats">
        {cats.map((c) => (
          <Link key={c.href} href={c.href} className="card cat-card">
            {c.img ? (
              <img className="pixel" src={c.img} alt="" width={56} height={56} />
            ) : (
              <span style={{ fontSize: 40, width: 56, textAlign: "center" }}>📘</span>
            )}
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{c.title}</div>
              <div className="count">{c.count}</div>
            </div>
          </Link>
        ))}
      </div>

      <h2>Batomon ทั้งหมด</h2>
      <div className="grid grid-mon">
        {batomon.slice(0, 12).map((b) => (
          <Link key={b.slug} href={`/batomon/${b.slug}`} className="card mon-card">
            <img className="pixel" src={b.image} alt={b.name} width={96} height={96} loading="lazy" />
            <div className="name">{b.name}</div>
          </Link>
        ))}
      </div>
      <p>
        <Link href="/batomon">ดู Batomon ทั้ง {batomon.length} ตัว →</Link>
      </p>

      <h2>เทรนเนอร์</h2>
      <div className="grid grid-mon">
        {trainers.slice(0, 12).map((t) => (
          <Link key={t.slug} href={`/trainers/${t.slug}`} className="card mon-card">
            <img className="pixel" src={t.image} alt={t.name} width={96} height={96} loading="lazy" />
            <div className="name">{t.name}</div>
          </Link>
        ))}
      </div>
      <p>
        <Link href="/trainers">ดูเทรนเนอร์ทั้ง {trainers.length} คน →</Link>
      </p>
    </>
  );
}
