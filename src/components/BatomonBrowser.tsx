"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Batomon } from "@/lib/types";
import { RARITY_ORDER, RARITY_TH, REGION_TH, TYPE_TH, th } from "@/lib/glossary";
import { CostBadge, RarityBadge, TypeBadge } from "./Badges";

type Props = { list: Batomon[] };

export default function BatomonBrowser({ list }: Props) {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");
  const [region, setRegion] = useState("");

  const types = useMemo(() => [...new Set(list.flatMap((b) => b.types))].sort(), [list]);
  const regions = useMemo(() => [...new Set(list.flatMap((b) => b.regions))].sort(), [list]);

  const shown = list.filter((b) => {
    if (type && !b.types.includes(type)) return false;
    if (rarity && b.rarity !== rarity) return false;
    if (region && !b.regions.includes(region)) return false;
    if (q) {
      const s = q.toLowerCase();
      const hay = [b.name, b.summary, b.summaryTh, ...b.types, ...b.types.map((t) => th(TYPE_TH, t))]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(s)) return false;
    }
    return true;
  });

  return (
    <>
      <div className="filters" role="search">
        <input
          type="search"
          placeholder="ค้นหาชื่อหรือความสามารถ…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="ค้นหา Batomon"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="ธาตุ">
          <option value="">ทุกธาตุ</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {th(TYPE_TH, t)}
            </option>
          ))}
        </select>
        <select value={rarity} onChange={(e) => setRarity(e.target.value)} aria-label="ความหายาก">
          <option value="">ทุกความหายาก</option>
          {RARITY_ORDER.map((r) => (
            <option key={r} value={r}>
              {th(RARITY_TH, r)}
            </option>
          ))}
        </select>
        <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="ภูมิภาค">
          <option value="">ทุกภูมิภาค</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {th(REGION_TH, r)}
            </option>
          ))}
        </select>
        <span className="count">{shown.length} ตัว</span>
      </div>

      {shown.length === 0 ? (
        <p className="empty">ไม่พบ Batomon ที่ตรงกับตัวกรอง</p>
      ) : (
        <div className="grid grid-mon">
          {shown.map((b) => (
            <Link key={b.slug} href={`/batomon/${b.slug}`} className="card mon-card">
              <img className="pixel" src={b.image} alt={b.name} width={96} height={96} loading="lazy" />
              <div className="name">{b.name}</div>
              <div className="badges" style={{ marginTop: 6 }}>
                {b.types.map((t) => (
                  <TypeBadge key={t} type={t} />
                ))}
              </div>
              <div className="badges" style={{ marginTop: 6 }}>
                <RarityBadge rarity={b.rarity} />
                <CostBadge cost={b.cost} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
