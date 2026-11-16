import type { Metadata } from "next";
import Link from "next/link";
import { BALANCE_VERSION, events } from "@/lib/data";

export const metadata: Metadata = {
  title: "อีเวนต์ทั้งหมด",
  description: `อีเวนต์ทั้ง ${events.length} เหตุการณ์ใน Batomon Showdown พร้อมตัวเลือกและรางวัลภาษาไทย`,
};

export default function EventsPage() {
  return (
    <>
      <nav className="breadcrumbs">
        <Link href="/">วิกิ</Link>
        <span>/</span>
        <span>อีเวนต์</span>
      </nav>
      <h1>อีเวนต์</h1>
      <p className="lede">
        เหตุการณ์สุ่มระหว่างการเดินทางที่ให้คุณเลือกรางวัล · ทั้งหมด {events.length} เหตุการณ์ · Balance {BALANCE_VERSION}
      </p>
      <div className="grid grid-list">
        {events.map((e) => (
          <Link key={e.slug} href={`/events/${e.slug}`} className="card entry-card">
            <img className="pixel" src={e.image} alt={e.name} width={56} height={56} loading="lazy" />
            <div className="body">
              <div className="name">{e.name}</div>
              <div className="badges">
                {e.tier !== null && <span className="badge gold">ระดับ {e.tier}</span>}
                <span className="badge">{e.options.length} ตัวเลือก</span>
              </div>
              <p>{e.textTh}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
