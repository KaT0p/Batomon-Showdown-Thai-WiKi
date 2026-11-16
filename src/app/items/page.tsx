import type { Metadata } from "next";
import Link from "next/link";
import CatalogBrowser from "@/components/CatalogBrowser";
import { BALANCE_VERSION, items } from "@/lib/data";

export const metadata: Metadata = {
  title: "ไอเท็มทั้งหมด",
  description: `รายชื่อไอเท็มทั้ง ${items.length} ชิ้น ใน Batomon Showdown พร้อมคำอธิบายภาษาไทย`,
};

export default function Page() {
  return (
    <>
      <nav className="breadcrumbs">
        <Link href="/">วิกิ</Link>
        <span>/</span>
        <span>ไอเท็ม</span>
      </nav>
      <h1>ไอเท็ม</h1>
      <p className="lede">
        ไอเท็มใช้ครั้งเดียวที่ซื้อได้จากร้านค้า · ทั้งหมด {items.length} ชิ้น · Balance {BALANCE_VERSION}
      </p>
      <CatalogBrowser list={items} basePath="/items" unit="ชิ้น" />
    </>
  );
}
