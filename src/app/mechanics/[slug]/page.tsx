import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { batomonUsingMechanic, getMechanic, MECHANIC_GROUPS, mechanics } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return mechanics.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const m = getMechanic(slug);
  if (!m) return {};
  return { title: `${m.nameTh} (${m.name}) – กลไกเกม`, description: m.summaryTh };
}

export default async function MechanicDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const m = getMechanic(slug);
  if (!m) notFound();

  const users = batomonUsingMechanic(m.name);
  const group = MECHANIC_GROUPS.find((g) => g.key === m.group);
  const sameGroup = mechanics.filter((x) => x.group === m.group && x.slug !== m.slug);

  return (
    <>
      <nav className="breadcrumbs">
        <Link href="/">วิกิ</Link>
        <span>/</span>
        <Link href="/mechanics">กลไกเกม</Link>
        <span>/</span>
        <span>{m.nameTh}</span>
      </nav>

      {group && <div className="muted small">{group.title}</div>}
      <h1>
        {m.nameTh} <span className="muted" style={{ fontSize: "0.6em" }}>({m.name})</span>
      </h1>
      <p className="lede">{m.summaryTh}</p>

      {m.sections.map((s, i) => {
        const List = s.ordered ? "ol" : "ul";
        return (
          <section key={i} className="card" style={{ marginBottom: 16 }}>
            <h2 style={{ marginTop: 0 }}>{s.headingTh}</h2>
            {s.paragraphsTh.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {s.itemsTh.length > 0 && (
              <List className="rule-list">
                {s.itemsTh.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </List>
            )}
          </section>
        );
      })}

      {users.length > 0 && (
        <section>
          <h2>
            Batomon ที่มี{m.nameTh}บนการ์ด ({users.length} ตัว)
          </h2>
          <div className="grid grid-mon">
            {users.map((b) => (
              <Link key={b.slug} href={`/batomon/${b.slug}`} className="card mon-card">
                <img className="pixel" src={b.image} alt={b.name} width={96} height={96} loading="lazy" />
                <div className="name">{b.name}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {sameGroup.length > 0 && (
        <section className="mech-group">
          <h2>กลไกที่เกี่ยวข้อง</h2>
          <div className="links">
            {sameGroup.map((x) => (
              <Link key={x.slug} href={`/mechanics/${x.slug}`}>
                {x.nameTh}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
