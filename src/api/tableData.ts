import { createApi } from "@reduxjs/toolkit/query/react";
import dataJson from "../data.json";
import type { IdType, Item, RawItem } from "../types";
import { API_TAGS } from "./tags";
import { normalizeItem } from "./dataNormalizer";

let localData: Item[] = (dataJson as RawItem[]).map(normalizeItem);

export const tableDataApi = createApi({
  reducerPath: "tableDataApi",
  tagTypes: [API_TAGS.ITEMS],
  baseQuery: async ({ method, body }) => {
    switch (method) {
      case "GET":
        return { data: localData };
      case "PUT": {
        const { id, ...patch } = body as Partial<Item> & Pick<Item, "id">;
        localData = localData.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        );
        return { data: localData.find((item) => item.id === id) };
      }
      case "DELETE": {
        const id = body as IdType;
        localData = localData.filter((item) => item.id !== id);
        return { data: { success: true, id } };
      }
      default:
        return { error: { status: 405 } };
    }
  },
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => ({ url: "/", method: "GET" }),
      providesTags: [API_TAGS.ITEMS],
    }),
    updateItem: builder.mutation<Item, Partial<Item> & Pick<Item, "id">>({
      query: (body) => ({ url: "/", method: "PUT", body }),
      invalidatesTags: [API_TAGS.ITEMS],
    }),
    deleteItem: builder.mutation<{ success: boolean; id: IdType }, IdType>({
      query: (id) => ({ url: "/", method: "DELETE", body: id }),
      invalidatesTags: [API_TAGS.ITEMS],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = tableDataApi;
