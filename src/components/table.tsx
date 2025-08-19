import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import type { IdType, Item } from "../types";
import Modal from "./modal";
import {
  useDeleteItemMutation,
  useGetItemsQuery,
  useUpdateItemMutation,
} from "../api";

const Table = () => {
  const { data } = useGetItemsQuery();

  const [updateItemMutation] = useUpdateItemMutation();
  const [deleteItemMutation] = useDeleteItemMutation();

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const onSave = (item: Item) => {
    updateItemMutation(item);
    setSelectedItem(null);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, item: Item) => {
    e.currentTarget.blur();
    setSelectedItem(item);
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>, id: IdType) => {
    e.currentTarget.blur();

    deleteItemMutation(id);
  };

  return (
    <>
      <DataTable
        value={data}
        dataKey="id"
        className="overflow-hidden rounded-lg "
      >
        <Column
          field="n"
          header="Name"
          sortable
          body={(rowData: Item) => (
            <span className="text-xs sm:text-base ">{rowData.name}</span>
          )}
          headerClassName="text-xs sm:text-base"
        />
        <Column
          field="category"
          header="Category"
          sortable
          body={(rowData: Item) => (
            <span className="text-xs sm:text-base">
              {rowData.category?.join(", ")}
            </span>
          )}
          headerClassName="text-xs sm:text-base"
        />
        <Column
          header="Actions"
          body={(rowData: Item) => (
            <div className="flex justify-end gap-1 sm:gap-2">
              <Button
                icon="pi pi-pencil"
                className="p-button-text p-button-sm "
                tooltip="Edit"
                tooltipOptions={{ position: "top" }}
                onClick={(e) => handleEdit(e, rowData)}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-text p-button-sm p-button-danger"
                tooltip="Delete"
                tooltipOptions={{ position: "top" }}
                onClick={(e) => onDelete(e, rowData.id)}
              />
            </div>
          )}
          headerClassName="flex justify-end !pr-[30px] text-xs sm:text-base"
        />
      </DataTable>

      <Modal
        visible={!!selectedItem}
        onRequestClose={() => setSelectedItem(null)}
        item={selectedItem}
        onSave={onSave}
        options={selectedItem?.category || []}
      />
    </>
  );
};

export default Table;
