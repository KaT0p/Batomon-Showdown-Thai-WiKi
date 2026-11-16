import batomonJson from "@/data/batomon.json";
import trainersJson from "@/data/trainers.json";
import trinketsJson from "@/data/trinkets.json";
import itemsJson from "@/data/items.json";
import eventsJson from "@/data/events.json";
import mechanicsJson from "@/data/mechanics.json";
import type { Batomon, CatalogEntry, GameEvent, Mechanic } from "./types";

export const batomon = batomonJson as Batomon[];
export const trainers = trainersJson as CatalogEntry[];
export const trinkets = trinketsJson as CatalogEntry[];
export const items = itemsJson as CatalogEntry[];
export const events = eventsJson as GameEvent[];
export const mechanics = mechanicsJson as Mechanic[];

export const BALANCE_VERSION = 27;

const bySlug = <T extends { slug: string }>(list: T[]) => new Map(list.map((x) => [x.slug, x]));
const batomonBySlug = bySlug(batomon);
const batomonByName = new Map(batomon.map((b) => [b.name, b]));

export const getBatomon = (slug: string) => batomonBySlug.get(slug);
export const getBatomonByName = (name: string) => batomonByName.get(name);
export const getTrainer = (slug: string) => trainers.find((t) => t.slug === slug);
export const getTrinket = (slug: string) => trinkets.find((t) => t.slug === slug);
export const getItem = (slug: string) => items.find((t) => t.slug === slug);
export const getEvent = (slug: string) => events.find((t) => t.slug === slug);
export const getMechanic = (slug: string) => mechanics.find((t) => t.slug === slug);

export const MECHANIC_GROUPS: { key: string; title: string }[] = [
  { key: "combat", title: "ค่าสถานะและสถานะในการต่อสู้" },
  { key: "timing", title: "จังหวะเวลาและการทำงานของสกิล" },
  { key: "battle", title: "กฎการต่อสู้" },
  { key: "unit", title: "การเปลี่ยนแปลงของยูนิต" },
  { key: "shop", title: "ร้านค้าและเศรษฐกิจ" },
];

/** ชื่อเต็มของ Batomon ที่ "พิมพ์" สถานะหรือทริกเกอร์นี้ไว้บนการ์ด */
export function batomonUsingMechanic(mechanicName: string): Batomon[] {
  const key = mechanicName.toLowerCase();
  return batomon.filter((b) =>
    b.levels.some(
      (l) =>
        l.stats.some((s) => s.key === key) ||
        (l.trigger ?? "").toLowerCase() === key ||
        (key === "multicast" && (l.multicast ?? 0) > 0),
    ),
  );
}
