import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogDetail from "@/components/CatalogDetail";
import { trainers, getTrainer } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return trainers.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getTrainer(slug);
  if (!e) return {};
  return { title: `${e.name} – เทรนเนอร์`, description: e.textTh };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const e = getTrainer(slug);
  if (!e) notFound();
  return <CatalogDetail entry={e} list={trainers} basePath="/trainers" sectionLabel="เทรนเนอร์" kindLabel="เทรนเนอร์" />;
}
