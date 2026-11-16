import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-thai",
});

export const metadata: Metadata = {
  title: {
    default: "Batomon Showdown Wiki ภาษาไทย",
    template: "%s · Batomon Wiki TH",
  },
  description:
    "วิกิภาษาไทยของเกม Batomon Showdown: ข้อมูล Batomon ทุกตัว เทรนเนอร์ ทริงเก็ต ไอเท็ม อีเวนต์ และกลไกการต่อสู้",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={notoThai.variable}>
      <body>
        <Header />
        <main>
          <div className="container">{children}</div>
        </main>
        <footer className="site-footer">
          <div className="container">
            <p>
              Batomon Showdown Wiki ภาษาไทย · เว็บไซต์แฟนเมดที่ไม่เกี่ยวข้องกับผู้พัฒนาเกมอย่างเป็นทางการ
            </p>
            <p>
              ข้อมูลอ้างอิงจาก{" "}
              <a href="https://batomon.com/wiki" target="_blank" rel="noreferrer">
                batomon.com/wiki
              </a>{" "}
              (Balance 27) แปลเป็นภาษาไทย · รูปภาพและชื่อในเกมเป็นลิขสิทธิ์ของผู้พัฒนา Batomon Showdown
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
