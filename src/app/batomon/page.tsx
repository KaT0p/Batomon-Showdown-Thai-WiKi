import type { Metadata } from "next";
import Link from "next/link";
import BatomonBrowser from "@/components/BatomonBrowser";
import { BALANCE_VERSION, batomon } from "@/lib/data";

export const metadata: Metadata = {
  title: "รายชื่อ Batomon ทั้งหมด",
  description: `ข้อมูล Batomon ทั้ง ${batomon.length} ตัว พร้อมธาตุ ความหายาก ราคา และความสามารถภาษาไทย`,
};

export default function BatomonListPage() {
  return (
    <>
      <nav className="breadcrumbs">
        <Link href="/">วิกิ</Link>
        <span>/</span>
        <span>Batomon</span>
      </nav>
      <h1>รายชื่อ Batomon</h1>
      <p className="lede">
        Batomon ทั้งหมด {batomon.length} ตัว · Balance {BALANCE_VERSION} · กดที่การ์ดเพื่อดูค่าสถานะทุกเลเวลและเวอร์ชัน SHINY
      </p>
      <BatomonBrowser list={batomon} />
    </>
  );
}
