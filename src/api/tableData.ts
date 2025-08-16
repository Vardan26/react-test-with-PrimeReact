import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Item } from "../types";

export const tableDataApi = createApi({
  reducerPath: "tableDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => "data.json",
    }),
  }),
});

export const { useGetItemsQuery } = tableDataApi;
