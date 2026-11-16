import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogDetail from "@/components/CatalogDetail";
import { items, getItem } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return items.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getItem(slug);
  if (!e) return {};
  return { title: `${e.name} – ไอเท็ม`, description: e.textTh };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const e = getItem(slug);
  if (!e) notFound();
  return <CatalogDetail entry={e} list={items} basePath="/items" sectionLabel="ไอเท็ม" kindLabel="ไอเท็ม" />;
}
