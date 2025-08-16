import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import type { Item } from "../types";
import Modal from "./modal";
import { useTableData } from "../hooks/tableData";

const Table = () => {
  const { items, updateItem, deleteItem } = useTableData();

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const onSave = (item: Item) => {
    updateItem(item);
    setSelectedItem(null);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, item: Item) => {
    e.currentTarget.blur();
    setSelectedItem(item);
  };

  const onDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number | string
  ) => {
    e.currentTarget.blur();

    deleteItem(id);
  };

  return (
    <>
      <DataTable
        value={items}
        dataKey="id"
        className="overflow-hidden rounded-lg "
      >
        <Column
          field="n"
          header="Name"
          sortable
          body={(rowData: Item) => <span>{rowData.n}</span>}
        />
        <Column
          field="c"
          header="Category"
          sortable
          body={(rowData: Item) => <span>{rowData.c?.join(", ")}</span>}
        />
        <Column
          header="Actions"
          body={(rowData: Item) => (
            <div className="flex justify-end gap-2">
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
          headerClassName="flex justify-end !pr-[30px]"
        />
      </DataTable>

      <Modal
        visible={!!selectedItem}
        onRequestClose={() => setSelectedItem(null)}
        item={selectedItem}
        onSave={onSave}
        options={selectedItem?.c || []}
      />
    </>
  );
};

export default Table;
