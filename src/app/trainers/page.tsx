import type { Metadata } from "next";
import Link from "next/link";
import CatalogBrowser from "@/components/CatalogBrowser";
import { BALANCE_VERSION, trainers } from "@/lib/data";

export const metadata: Metadata = {
  title: "เทรนเนอร์ทั้งหมด",
  description: `รายชื่อเทรนเนอร์ทั้ง ${trainers.length} คน ใน Batomon Showdown พร้อมคำอธิบายภาษาไทย`,
};

export default function Page() {
  return (
    <>
      <nav className="breadcrumbs">
        <Link href="/">วิกิ</Link>
        <span>/</span>
        <span>เทรนเนอร์</span>
      </nav>
      <h1>เทรนเนอร์</h1>
      <p className="lede">
        เทรนเนอร์แต่ละคนมีความสามารถพิเศษที่ส่งผลตลอดทั้งรอบการเล่น · ทั้งหมด {trainers.length} คน · Balance {BALANCE_VERSION}
      </p>
      <CatalogBrowser list={trainers} basePath="/trainers" unit="คน" />
    </>
  );
}
