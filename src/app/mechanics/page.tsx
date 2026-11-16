import type { Metadata } from "next";
import Link from "next/link";
import { MECHANIC_GROUPS, mechanics } from "@/lib/data";

export const metadata: Metadata = {
  title: "กลไกเกมและกฎการต่อสู้",
  description: "อธิบายกลไกการต่อสู้ของ Batomon Showdown เป็นภาษาไทย: ดาเมจ โล่ เผาไหม้ พิษ ช็อต คูลดาวน์ และอื่น ๆ",
};

export default function MechanicsPage() {
  return (
    <>
      <nav className="breadcrumbs">
        <Link href="/">วิกิ</Link>
        <span>/</span>
        <span>กลไกเกม</span>
      </nav>
      <h1>กลไกเกม</h1>
      <p className="lede">กฎการต่อสู้แบบละเอียด ตั้งแต่ค่าสถานะ จังหวะการทำงานของสกิล ไปจนถึงร้านค้า</p>

      {MECHANIC_GROUPS.map((g) => {
        const list = mechanics.filter((m) => m.group === g.key);
        if (list.length === 0) return null;
        return (
          <section key={g.key} className="mech-group">
            <h2>{g.title}</h2>
            <div className="grid grid-list">
              {list.map((m) => (
                <Link key={m.slug} href={`/mechanics/${m.slug}`} className="card">
                  <div className="name" style={{ fontWeight: 700 }}>
                    {m.nameTh} <span className="muted small">({m.name})</span>
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: "0.95rem" }}>{m.summaryTh}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
