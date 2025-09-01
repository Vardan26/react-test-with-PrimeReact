export type IdType = number | string;

export type Item = {
  id: IdType;
  name: string;
  category: string[];
};

export type RawItem = {
  id: IdType;
  n: string;
  c: string[];
};
