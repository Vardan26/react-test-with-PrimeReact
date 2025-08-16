import { useEffect } from "react";
import { useAppDispatch, useAppSelector, type AppState } from "../store";
import { useGetItemsQuery } from "../api";
import {
  setItems,
  updateItem,
  deleteItem,
} from "../store/tableData/tableDataSlice";

import type { Item } from "../types";

export const useTableData = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetItemsQuery();
  const items = useAppSelector((state: AppState) => state.tableData.items);

  useEffect(() => {
    if (data) {
      dispatch(setItems(data));
    }
  }, [data, dispatch]);

  const handleUpdate = (item: Item) => dispatch(updateItem(item));
  const handleDelete = (id: number) => dispatch(deleteItem(id));

  return {
    items,
    isLoading,
    isError,
    updateItem: handleUpdate,
    deleteItem: handleDelete,
  };
};
