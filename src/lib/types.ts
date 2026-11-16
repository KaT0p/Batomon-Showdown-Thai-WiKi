export type Stat = { key: string; value: number };

export type MonsterLevel = {
  level: number;
  cooldown: number | null;
  multicast: number | null;
  stats: Stat[];
  trigger: string | null;
  text: string;
  textTh: string;
};

export type Evolution = { name: string; level: string } | null;

export type Batomon = {
  slug: string;
  name: string;
  rarity: string | null;
  types: string[];
  cost: number | null;
  regions: string[];
  summary: string;
  summaryTh: string;
  image: string;
  shinyImage: string | null;
  tier?: number;
  evolvesFrom: Evolution;
  evolvesInto: Evolution;
  levels: MonsterLevel[];
  shinyLevels: MonsterLevel[] | null;
};

export type CatalogEntry = {
  slug: string;
  name: string;
  image: string;
  rarity: string | null;
  attributes: string[];
  regions: string[];
  cost: number | null;
  text: string;
  textTh: string;
};

export type GameEvent = {
  slug: string;
  name: string;
  image: string;
  tier: number | null;
  text: string;
  textTh: string;
  requirement: string | null;
  requirementTh: string | null;
  options: {
    label: string;
    labelTh: string;
    effect: string;
    effectTh: string;
    notes: string[];
    notesTh: string[];
  }[];
};

export type MechanicSection = {
  heading: string;
  headingTh: string;
  ordered: boolean;
  paragraphs: string[];
  paragraphsTh: string[];
  items: string[];
  itemsTh: string[];
};

export type Mechanic = {
  slug: string;
  name: string;
  nameTh: string;
  group: string;
  summary: string;
  summaryTh: string;
  sections: MechanicSection[];
};
