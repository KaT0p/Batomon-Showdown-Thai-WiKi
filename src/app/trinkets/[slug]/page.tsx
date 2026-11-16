import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogDetail from "@/components/CatalogDetail";
import { trinkets, getTrinket } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return trinkets.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getTrinket(slug);
  if (!e) return {};
  return { title: `${e.name} – ทริงเก็ต`, description: e.textTh };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const e = getTrinket(slug);
  if (!e) notFound();
  return <CatalogDetail entry={e} list={trinkets} basePath="/trinkets" sectionLabel="ทริงเก็ต" kindLabel="ทริงเก็ต" />;
}
