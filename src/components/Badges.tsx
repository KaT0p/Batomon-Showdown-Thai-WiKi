import {
  ATTRIBUTE_TH,
  RARITY_COLOR,
  RARITY_TH,
  REGION_TH,
  TYPE_COLOR,
  TYPE_TH,
  th,
} from "@/lib/glossary";

export function TypeBadge({ type }: { type: string }) {
  return (
    <span className="badge type" style={{ background: TYPE_COLOR[type] ?? "#58637a" }}>
      {th(TYPE_TH, type)}
    </span>
  );
}

export function RarityBadge({ rarity }: { rarity: string | null }) {
  if (!rarity) return null;
  const c = RARITY_COLOR[rarity] ?? "#9aa4b2";
  return (
    <span className="badge" style={{ color: c, borderColor: c }}>
      {th(RARITY_TH, rarity)}
    </span>
  );
}

export function CostBadge({ cost }: { cost: number | null }) {
  if (cost === null || cost === undefined) return null;
  return <span className="badge gold">💰 {cost} โกลด์</span>;
}

export function RegionBadge({ region }: { region: string }) {
  return <span className="badge">🗺️ {th(REGION_TH, region)}</span>;
}

export function AttributeBadge({ attr }: { attr: string }) {
  return <span className="badge">{th(ATTRIBUTE_TH, attr)}</span>;
}
