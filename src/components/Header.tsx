"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "หน้าแรก" },
  { href: "/batomon", label: "Batomon" },
  { href: "/trainers", label: "เทรนเนอร์" },
  { href: "/trinkets", label: "ทริงเก็ต" },
  { href: "/items", label: "ไอเท็ม" },
  { href: "/events", label: "อีเวนต์" },
  { href: "/mechanics", label: "กลไกเกม" },
];

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="site-header">
      <div className="container inner">
        <Link href="/" className="brand">
          <span className="logo">TH</span>
          <span>Batomon Wiki</span>
        </Link>
        <nav className="main-nav" aria-label="เมนูหลัก">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={isActive(n.href) ? "active" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
