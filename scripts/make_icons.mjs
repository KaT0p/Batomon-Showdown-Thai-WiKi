// สร้างไอคอนทั้งหมดจาก public/brand/logo-mark.svg และ public/brand/logo.svg
// วิธีใช้: node scripts/make_icons.mjs   (ต้องมี python3 + Pillow สำหรับสร้าง .ico)
import { execFileSync } from "node:child_process";
import { copyFileSync, readFileSync } from "node:fs";
import sharp from "sharp";

const MARK = "public/brand/logo-mark.svg";
const LOGO = "public/brand/logo.svg";
const png = (src, size, out) => sharp(src, { density: 300 }).resize(size, size).png().toFile(out);

// ไอคอนที่ Next.js App Router หยิบไปใส่ <head> ให้อัตโนมัติ
copyFileSync(MARK, "src/app/icon.svg");
await png(MARK, 180, "src/app/apple-icon.png");

// ไอคอนสำหรับ PWA / manifest
await png(MARK, 192, "public/brand/icon-192.png");
await png(MARK, 512, "public/brand/icon-512.png");

// โลโก้เต็ม (พื้นโปร่งใส)
await sharp(LOGO, { density: 200 }).resize({ width: 1040 }).png().toFile("public/brand/logo.png");

// ภาพตอนแชร์ลิงก์ (Open Graph) 1200×630
const logoBuf = await sharp(LOGO, { density: 200 }).resize({ width: 880 }).png().toBuffer();
const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><radialGradient id="g" cx="0.2" cy="0" r="1"><stop offset="0" stop-color="#22324f"/><stop offset="1" stop-color="#0f141d"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/></svg>`);
await sharp(bg)
  .composite([{ input: logoBuf, top: Math.round((630 - 237) / 2) - 20, left: 160 }])
  .png()
  .toFile("src/app/opengraph-image.png");

// favicon.ico หลายขนาดในไฟล์เดียว
await png(MARK, 256, "/tmp/batomon-mark-256.png");
execFileSync("python3", [
  "-c",
  "from PIL import Image; Image.open('/tmp/batomon-mark-256.png').save('src/app/favicon.ico', sizes=[(16,16),(32,32),(48,48),(64,64)])",
]);

console.log("สร้างไอคอนเรียบร้อย:", readFileSync("src/app/favicon.ico").length, "bytes (favicon.ico)");
