"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CatalogEntry } from "@/lib/types";
import { ATTRIBUTE_TH, RARITY_ORDER, RARITY_TH, REGION_TH, th } from "@/lib/glossary";
import { AttributeBadge, CostBadge, RarityBadge, RegionBadge } from "./Badges";

type Props = {
  list: CatalogEntry[];
  basePath: string;
  unit: string;
};

export default function CatalogBrowser({ list, basePath, unit }: Props) {
  const [q, setQ] = useState("");
  const [rarity, setRarity] = useState("");
  const [attr, setAttr] = useState("");
  const [region, setRegion] = useState("");

  const rarities = RARITY_ORDER.filter((r) => list.some((e) => e.rarity === r));
  const attrs = useMemo(() => [...new Set(list.flatMap((e) => e.attributes))].sort(), [list]);
  const regions = useMemo(() => [...new Set(list.flatMap((e) => e.regions))].sort(), [list]);

  const shown = list.filter((e) => {
    if (rarity && e.rarity !== rarity) return false;
    if (attr && !e.attributes.includes(attr)) return false;
    if (region && !e.regions.includes(region)) return false;
    if (q) {
      const s = q.toLowerCase();
      if (!`${e.name} ${e.text} ${e.textTh}`.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  return (
    <>
      <div className="filters" role="search">
        <input
          type="search"
          placeholder="ค้นหาชื่อหรือเอฟเฟกต์…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="ค้นหา"
        />
        {rarities.length > 0 && (
          <select value={rarity} onChange={(e) => setRarity(e.target.value)} aria-label="ความหายาก">
            <option value="">ทุกความหายาก</option>
            {rarities.map((r) => (
              <option key={r} value={r}>
                {th(RARITY_TH, r)}
              </option>
            ))}
          </select>
        )}
        {attrs.length > 0 && (
          <select value={attr} onChange={(e) => setAttr(e.target.value)} aria-label="คุณสมบัติ">
            <option value="">ทุกคุณสมบัติ</option>
            {attrs.map((a) => (
              <option key={a} value={a}>
                {th(ATTRIBUTE_TH, a)}
              </option>
            ))}
          </select>
        )}
        {regions.length > 0 && (
          <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="ภูมิภาค">
            <option value="">ทุกภูมิภาค</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {th(REGION_TH, r)}
              </option>
            ))}
          </select>
        )}
        <span className="count">
          {shown.length} {unit}
        </span>
      </div>

      {shown.length === 0 ? (
        <p className="empty">ไม่พบรายการที่ตรงกับตัวกรอง</p>
      ) : (
        <div className="grid grid-list">
          {shown.map((e) => (
            <Link key={e.slug} href={`${basePath}/${e.slug}`} className="card entry-card">
              <img className="pixel" src={e.image} alt={e.name} width={56} height={56} loading="lazy" />
              <div className="body">
                <div className="name">{e.name}</div>
                <div className="badges">
                  <RarityBadge rarity={e.rarity} />
                  <CostBadge cost={e.cost} />
                  {e.attributes.map((a) => (
                    <AttributeBadge key={a} attr={a} />
                  ))}
                  {e.regions.map((r) => (
                    <RegionBadge key={r} region={r} />
                  ))}
                </div>
                <p>{e.textTh}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
