import type { RawItem, Item } from "../types";

export const normalizeItem = (raw: RawItem): Item => ({
  id: raw.id,
  name: raw.n,
  category: raw.c,
});

export const denormalizeItem = (item: Item): RawItem => ({
  id: item.id,
  n: item.name,
  c: item.category,
});
