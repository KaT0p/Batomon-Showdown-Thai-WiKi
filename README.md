# Batomon Showdown Wiki ภาษาไทย

เว็บวิกิภาษาไทยของเกม Batomon Showdown สร้างด้วย Next.js 16 (App Router, TypeScript)
ข้อมูลอ้างอิงจาก https://batomon.com/wiki (Balance 27) และแปลเป็นภาษาไทยทั้งหมด

## เริ่มใช้งาน

```bash
npm install
npm run dev      # เปิด http://localhost:3000
npm run build    # build เป็นหน้า static ทั้งหมด (~375 หน้า)
```

## โครงสร้าง

```
public/images/        รูปที่ดาวน์โหลดเก็บไว้เอง
  monster/            Batomon 148 ตัว + ร่าง SHINY
  trainer/            เทรนเนอร์ 25 คน
  trinket/ item/ event/
src/app/              หน้าเว็บ (หน้าแรก, batomon, trainers, trinkets, items, events, mechanics)
src/components/       คอมโพเนนต์ (ตัวกรอง, การ์ด, ตารางเลเวล/SHINY)
src/lib/glossary.ts   คำศัพท์เกม อังกฤษ → ไทย (ธาตุ, ความหายาก, ทริกเกอร์, ค่าสถานะ)
src/data/*.json       ข้อมูลที่ build แล้ว (มีทั้งภาษาอังกฤษและภาษาไทย)
scripts/raw/          ข้อมูลดิบที่ดึงมาจากเว็บต้นทาง
scripts/i18n/         ไฟล์คำแปล แก้คำแปลได้ที่นี่
scripts/scrape.py     สคริปต์ดึงข้อมูลและรูป
scripts/build_data.py สคริปต์รวมข้อมูลดิบ + คำแปล → src/data
```

## แก้คำแปล

คำแปลความสามารถ/เอฟเฟกต์เก็บเป็น "เทมเพลต" ที่แทนตัวเลขด้วย `{0}`, `{1}` …
เช่น `"+{0} Damage permanently."` → `"+{0} ดาเมจ แบบถาวร"`
เทมเพลตเดียวใช้ได้กับทุกเลเวลที่ตัวเลขต่างกัน

1. แก้ไฟล์ใน `scripts/i18n/` (`batomon.json`, `catalog.json`, `events.json`, `mechanics.json`)
2. รัน `python3 scripts/build_data.py`
3. ข้อความที่ยังไม่มีคำแปลจะอยู่ใน `scripts/missing-translations.txt`

## อัปเดตเมื่อเกมออกแพตช์ใหม่

```bash
python3 -I scripts/scrape.py /tmp/batomon-cache scripts/raw public/images
python3 scripts/build_data.py
```

จากนั้นเปิด `scripts/missing-translations.txt` แล้วเพิ่มคำแปลของข้อความใหม่ลงใน `scripts/i18n/`

## หมายเหตุลิขสิทธิ์

นี่เป็นเว็บแฟนเมดที่ไม่เกี่ยวข้องกับผู้พัฒนาเกมอย่างเป็นทางการ รูปภาพ ชื่อ และข้อมูลในเกมเป็นลิขสิทธิ์ของผู้พัฒนา Batomon Showdown
ข้อมูลรวบรวมจาก batomon.com ก่อนเผยแพร่สาธารณะ ควรตรวจสอบเงื่อนไขการใช้งานของผู้พัฒนาเกมและเว็บต้นทาง
