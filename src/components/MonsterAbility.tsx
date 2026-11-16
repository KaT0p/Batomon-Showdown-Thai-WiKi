"use client";

import { useState } from "react";
import type { Batomon, MonsterLevel } from "@/lib/types";
import { STAT_ICON, STAT_TH, TRIGGER_TH, th } from "@/lib/glossary";

function LevelCard({ lv }: { lv: MonsterLevel }) {
  return (
    <div className="ability">
      <div className="stat-row">
        {lv.cooldown !== null && (
          <span className="stat">
            ⏱️ {lv.cooldown} วิ<small>คูลดาวน์</small>
          </span>
        )}
        {lv.multicast ? (
          <span className="stat">
            {STAT_ICON.multicast} ×{lv.multicast}
            <small>{STAT_TH.multicast}</small>
          </span>
        ) : null}
        {lv.stats.map((s) => (
          <span className="stat" key={s.key}>
            {STAT_ICON[s.key] ?? "•"} {s.value}
            <small>{th(STAT_TH, s.key)}</small>
          </span>
        ))}
      </div>
      {lv.trigger && <span className="trigger">{th(TRIGGER_TH, lv.trigger)}</span>}
      {lv.textTh ? <div className="text">{lv.textTh}</div> : <div className="muted">ไม่มีความสามารถพิเศษ</div>}
      {lv.text && <div className="muted small" style={{ marginTop: 6 }}>EN: {lv.text}</div>}
    </div>
  );
}

export default function MonsterAbility({ mon }: { mon: Batomon }) {
  const [shiny, setShiny] = useState(false);
  const levels = (shiny ? mon.shinyLevels : mon.levels) ?? mon.levels;
  const [level, setLevel] = useState(levels[0]?.level ?? 1);
  const current = levels.find((l) => l.level === level) ?? levels[0];

  return (
    <section>
      <div className="section-title">
        <h2>ความสามารถ</h2>
        {mon.shinyImage && (
          <img
            className="pixel"
            src={shiny ? mon.shinyImage : mon.image}
            alt={shiny ? `${mon.name} SHINY` : mon.name}
            width={64}
            height={64}
          />
        )}
      </div>
      <div className="toggle-row" role="group" aria-label="เลือกเลเวล">
        {levels.map((l) => (
          <button key={l.level} className={l.level === level ? "on" : ""} onClick={() => setLevel(l.level)}>
            Lv {l.level}
          </button>
        ))}
        {mon.shinyLevels && (
          <button className={shiny ? "on" : ""} onClick={() => setShiny((s) => !s)}>
            ✨ SHINY
          </button>
        )}
      </div>
      {current && <LevelCard lv={current} />}

      <h2>ตารางค่าสถานะทุกเลเวล{shiny ? " (SHINY)" : ""}</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>เลเวล</th>
              <th>คูลดาวน์</th>
              <th>ค่าสถานะ</th>
              <th>ความสามารถ</th>
            </tr>
          </thead>
          <tbody>
            {levels.map((l) => (
              <tr key={l.level}>
                <td>Lv {l.level}</td>
                <td>{l.cooldown !== null ? `${l.cooldown} วิ` : "-"}</td>
                <td>
                  {l.stats.length === 0 && !l.multicast
                    ? "-"
                    : [
                        ...l.stats.map((s) => `${th(STAT_TH, s.key)} ${s.value}`),
                        ...(l.multicast ? [`มัลติแคสต์ ×${l.multicast}`] : []),
                      ].join(" · ")}
                </td>
                <td>
                  {l.trigger && <strong>{th(TRIGGER_TH, l.trigger)}: </strong>}
                  {l.textTh || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
