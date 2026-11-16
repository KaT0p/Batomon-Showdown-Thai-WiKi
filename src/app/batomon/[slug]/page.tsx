import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CostBadge, RarityBadge, RegionBadge, TypeBadge } from "@/components/Badges";
import MonsterAbility from "@/components/MonsterAbility";
import { batomon, getBatomon, getBatomonByName } from "@/lib/data";
import { RARITY_TH, REGION_TH, TYPE_TH, th } from "@/lib/glossary";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return batomon.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBatomon(slug);
  if (!b) return {};
  return {
    title: `${b.name} – ข้อมูล Batomon`,
    description: `${b.name} ธาตุ${b.types.map((t) => th(TYPE_TH, t)).join("/")} ความหายาก${th(RARITY_TH, b.rarity)} ${b.summaryTh}`,
  };
}

function EvoLink({ name, label }: { name: string; label: string }) {
  const m = getBatomonByName(name);
  if (!m) return <span className="badge">{name}</span>;
  return (
    <Link href={`/batomon/${m.slug}`} className="card">
      <img className="pixel" src={m.image} alt={m.name} width={56} height={56} />
      <div>
        <div className="muted small">{label}</div>
        <strong>{m.name}</strong>
      </div>
    </Link>
  );
}

export default async function BatomonDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const b = getBatomon(slug);
  if (!b) notFound();

  const idx = batomon.findIndex((x) => x.slug === slug);
  const prev = batomon[idx - 1];
  const next = batomon[idx + 1];

  return (
    <>
      <nav className="breadcrumbs">
        <Link href="/">วิกิ</Link>
        <span>/</span>
        <Link href="/batomon">Batomon</Link>
        <span>/</span>
        <span>{b.name}</span>
      </nav>

      <div className="detail-head">
        <img className="pixel sprite" src={b.image} alt={b.name} width={160} height={160} />
        <div>
          <h1>{b.name}</h1>
          <div className="badges">
            {b.types.map((t) => (
              <TypeBadge key={t} type={t} />
            ))}
            <RarityBadge rarity={b.rarity} />
            <CostBadge cost={b.cost} />
            {b.regions.map((r) => (
              <RegionBadge key={r} region={r} />
            ))}
          </div>
          {b.summaryTh && <p className="desc">{b.summaryTh}</p>}
          <div className="kv">
            <div>
              <span>ความหายาก</span>
              {th(RARITY_TH, b.rarity) || "-"}
            </div>
            <div>
              <span>ราคา</span>
              {b.cost !== null ? `${b.cost} โกลด์` : "-"}
            </div>
            <div>
              <span>ธาตุ</span>
              {b.types.map((t) => th(TYPE_TH, t)).join(" / ") || "-"}
            </div>
            <div>
              <span>ภูมิภาค</span>
              {b.regions.map((r) => th(REGION_TH, r)).join(", ") || "-"}
            </div>
          </div>
        </div>
      </div>

      {(b.evolvesFrom || b.evolvesInto) && (
        <section>
          <h2>การวิวัฒนาการ</h2>
          <div className="evo">
            {b.evolvesFrom && (
              <>
                <EvoLink name={b.evolvesFrom.name} label="วิวัฒนาการมาจาก" />
                <span className="muted">→ ที่เลเวล {b.evolvesFrom.level} →</span>
              </>
            )}
            <span className="badge gold">{b.name}</span>
            {b.evolvesInto && (
              <>
                <span className="muted">→ ที่เลเวล {b.evolvesInto.level} →</span>
                <EvoLink name={b.evolvesInto.name} label="วิวัฒนาการเป็น" />
              </>
            )}
          </div>
        </section>
      )}

      <MonsterAbility mon={b} />

      <p className="muted small" style={{ marginTop: 16 }}>
        ค่าที่แสดงคือค่าพื้นฐานที่พิมพ์อยู่บนการ์ดในเกม Batomon ที่เล่นจริงอาจได้บัฟถาวร บัฟเฉพาะการต่อสู้ และผลจากอุปกรณ์เพิ่มเติม
      </p>

      <div className="evo" style={{ justifyContent: "space-between", marginTop: 28 }}>
        {prev ? <Link href={`/batomon/${prev.slug}`}>← {prev.name}</Link> : <span />}
        {next ? <Link href={`/batomon/${next.slug}`}>{next.name} →</Link> : <span />}
      </div>
    </>
  );
}
