import Link from "next/link";
import type { CatalogEntry } from "@/lib/types";
import { ATTRIBUTE_TH, RARITY_TH, REGION_TH, th } from "@/lib/glossary";
import { AttributeBadge, CostBadge, RarityBadge, RegionBadge } from "./Badges";

type Props = {
  entry: CatalogEntry;
  list: CatalogEntry[];
  basePath: string;
  sectionLabel: string;
  kindLabel: string;
};

export default function CatalogDetail({ entry, list, basePath, sectionLabel, kindLabel }: Props) {
  const related = list
    .filter((e) => e.slug !== entry.slug && e.rarity === entry.rarity)
    .slice(0, 8);

  return (
    <>
      <nav className="breadcrumbs">
        <Link href="/">วิกิ</Link>
        <span>/</span>
        <Link href={basePath}>{sectionLabel}</Link>
        <span>/</span>
        <span>{entry.name}</span>
      </nav>

      <div className="detail-head">
        <img className="pixel sprite sm" src={entry.image} alt={entry.name} width={112} height={112} />
        <div>
          <div className="muted small">{kindLabel}</div>
          <h1>{entry.name}</h1>
          <div className="badges">
            <RarityBadge rarity={entry.rarity} />
            <CostBadge cost={entry.cost} />
            {entry.attributes.map((a) => (
              <AttributeBadge key={a} attr={a} />
            ))}
            {entry.regions.map((r) => (
              <RegionBadge key={r} region={r} />
            ))}
          </div>
          <p className="desc">{entry.textTh}</p>
          <p className="en">EN: {entry.text}</p>
          <div className="kv">
            {entry.rarity && (
              <div>
                <span>ความหายาก</span>
                {th(RARITY_TH, entry.rarity)}
              </div>
            )}
            {entry.cost !== null && (
              <div>
                <span>ราคา</span>
                {entry.cost} โกลด์
              </div>
            )}
            {entry.attributes.length > 0 && (
              <div>
                <span>คุณสมบัติ</span>
                {entry.attributes.map((a) => th(ATTRIBUTE_TH, a)).join(", ")}
              </div>
            )}
            {entry.regions.length > 0 && (
              <div>
                <span>ภูมิภาค</span>
                {entry.regions.map((r) => th(REGION_TH, r)).join(", ")}
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2>{kindLabel}อื่นที่{entry.rarity ? `ความหายากเดียวกัน` : "น่าสนใจ"}</h2>
          <div className="grid grid-list">
            {related.map((e) => (
              <Link key={e.slug} href={`${basePath}/${e.slug}`} className="card entry-card">
                <img className="pixel" src={e.image} alt={e.name} width={56} height={56} loading="lazy" />
                <div className="body">
                  <div className="name">{e.name}</div>
                  <p>{e.textTh}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
