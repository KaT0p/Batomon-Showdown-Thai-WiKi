import type { Metadata } from "next";
import Link from "next/link";
import CatalogBrowser from "@/components/CatalogBrowser";
import { BALANCE_VERSION, trinkets } from "@/lib/data";

export const metadata: Metadata = {
  title: "ทริงเก็ตทั้งหมด",
  description: `รายชื่อทริงเก็ตทั้ง ${trinkets.length} ชิ้น ใน Batomon Showdown พร้อมคำอธิบายภาษาไทย`,
};

export default function Page() {
  return (
    <>
      <nav className="breadcrumbs">
        <Link href="/">วิกิ</Link>
        <span>/</span>
        <span>ทริงเก็ต</span>
      </nav>
      <h1>ทริงเก็ต</h1>
      <p className="lede">
        ทริงเก็ตคืออุปกรณ์ติดตัวที่ให้เอฟเฟกต์ถาวรกับทีมของคุณ · ทั้งหมด {trinkets.length} ชิ้น · Balance {BALANCE_VERSION}
      </p>
      <CatalogBrowser list={trinkets} basePath="/trinkets" unit="ชิ้น" />
    </>
  );
}
