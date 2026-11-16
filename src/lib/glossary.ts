// คำศัพท์เกม อังกฤษ → ไทย ใช้ร่วมกันทุกหน้า

export const TYPE_TH: Record<string, string> = {
  Bug: "แมลง",
  Dragon: "มังกร",
  Electric: "ไฟฟ้า",
  Fighting: "ต่อสู้",
  Fire: "ไฟ",
  Flying: "บิน",
  Ghost: "ผี",
  Grass: "หญ้า",
  Null: "นัล",
  Rock: "หิน",
  Steel: "เหล็ก",
  Toxic: "พิษ",
  Water: "น้ำ",
  // แอตทริบิวต์พิเศษที่เว็บต้นทางใช้กรองข้อมูล
  All: "ทุกธาตุ",
  Charge: "ชาร์จ",
  "Cooldown Speed": "ความเร็วคูลดาวน์",
  Curio: "ของแปลก",
  Knockout: "น็อกเอาต์",
  Protect: "ป้องกัน",
  SECRET: "ลับ",
  UNAVAILABLE: "ไม่ปรากฏในร้าน",
};

export const TYPE_COLOR: Record<string, string> = {
  Bug: "#8fb339",
  Dragon: "#6f5cf0",
  Electric: "#e8c22c",
  Fighting: "#c4503b",
  Fire: "#ef7a2e",
  Flying: "#7fa8e8",
  Ghost: "#7a5c9e",
  Grass: "#4caf50",
  Null: "#8a8f99",
  Rock: "#b09a62",
  Steel: "#8fa3b5",
  Toxic: "#a24cc2",
  Water: "#3d8fe0",
};

export const RARITY_TH: Record<string, string> = {
  Common: "ธรรมดา",
  Uncommon: "ไม่ธรรมดา",
  Rare: "หายาก",
  "Super Rare": "หายากมาก",
  Legendary: "ตำนาน",
  Mythical: "เทพนิยาย",
};

export const RARITY_ORDER = ["Common", "Uncommon", "Rare", "Super Rare", "Legendary", "Mythical"];

export const RARITY_COLOR: Record<string, string> = {
  Common: "#9aa4b2",
  Uncommon: "#5cc06b",
  Rare: "#4a9cf0",
  "Super Rare": "#b06cf0",
  Legendary: "#f0a63c",
  Mythical: "#f05c8c",
};

export const REGION_TH: Record<string, string> = {
  "Jinto region": "ภูมิภาคจินโตะ",
  "Pantra region": "ภูมิภาคพันทรา",
};

export const ATTRIBUTE_TH: Record<string, string> = {
  "Event reward": "รางวัลจากอีเวนต์",
  "Random gifts": "ของขวัญสุ่ม",
  "Trainer source": "ได้จากเทรนเนอร์",
  Unique: "มีได้ชิ้นเดียว",
  "Appears once per day": "ปรากฏวันละครั้ง",
  "Witch Potion": "ยาของแม่มด",
};

export const STAT_TH: Record<string, string> = {
  damage: "ดาเมจ",
  heal: "ฮีล",
  shield: "โล่",
  burn: "เผาไหม้",
  poison: "พิษ",
  shock: "ช็อต",
  hp: "HP",
  multicast: "มัลติแคสต์",
  charge: "ชาร์จ",
};

export const STAT_ICON: Record<string, string> = {
  damage: "⚔️",
  heal: "💚",
  shield: "🛡️",
  burn: "🔥",
  poison: "☠️",
  shock: "⚡",
  hp: "❤️",
  multicast: "🔁",
  charge: "🔋",
};

export const TRIGGER_TH: Record<string, string> = {
  "On Cast": "เมื่อร่าย",
  "On Battle Start": "เมื่อเริ่มการต่อสู้",
  "On Bought": "เมื่อถูกซื้อ",
  Ongoing: "ต่อเนื่อง",
  "On Victory": "เมื่อชนะ",
  "On Knockout": "เมื่อถูกน็อกเอาต์",
  "On Level Up": "เมื่อเลเวลอัป",
  "On Sell": "เมื่อขาย",
};

export const th = (map: Record<string, string>, key: string | null | undefined): string =>
  key ? map[key] ?? key : "";
