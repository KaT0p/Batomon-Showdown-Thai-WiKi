import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, getEvent } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  return { title: `${e.name} – อีเวนต์`, description: e.textTh };
}

export default async function EventDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();
  const others = events.filter((x) => x.slug !== e.slug);

  return (
    <>
      <nav className="breadcrumbs">
        <Link href="/">วิกิ</Link>
        <span>/</span>
        <Link href="/events">อีเวนต์</Link>
        <span>/</span>
        <span>{e.name}</span>
      </nav>

      <div className="detail-head">
        <img className="pixel sprite" src={e.image} alt={e.name} width={160} height={160} />
        <div>
          <div className="muted small">อีเวนต์</div>
          <h1>{e.name}</h1>
          <div className="badges">
            {e.tier !== null && <span className="badge gold">ระดับ {e.tier}</span>}
            <span className="badge">{e.options.length} ตัวเลือก</span>
          </div>
          <p className="desc">{e.textTh}</p>
          <p className="en">EN: {e.text}</p>
        </div>
      </div>

      <h2>ตัวเลือกในอีเวนต์</h2>
      {e.requirementTh && <p className="badge gold">🔒 {e.requirementTh}</p>}
      {e.options.length === 0 ? (
        <p className="muted">ไม่มีข้อมูลตัวเลือก</p>
      ) : (
        e.options.map((o, i) => (
          <div className="option" key={i}>
            <strong>
              {i + 1}. {o.labelTh}
            </strong>
            <span>{o.effectTh}</span>
            {o.notesTh.map((n, j) => (
              <div key={j} className="small" style={{ color: "var(--accent)" }}>
                ℹ️ {n}
              </div>
            ))}
            <div className="muted small">
              EN: {o.label} — {o.effect}
            </div>
          </div>
        ))
      )}

      <h2>อีเวนต์อื่น ๆ</h2>
      <div className="grid grid-mon">
        {others.map((x) => (
          <Link key={x.slug} href={`/events/${x.slug}`} className="card mon-card">
            <img className="pixel" src={x.image} alt={x.name} width={96} height={96} loading="lazy" />
            <div className="name">{x.name}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
