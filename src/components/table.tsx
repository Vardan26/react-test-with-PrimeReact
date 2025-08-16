import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import type { Item } from "../types";
import EditModal from "./modal";

type Props = {
  data: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: number | string) => void;
};

const TableComponent = ({ data, onEdit, onDelete }: Props) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const onSave = (item: Item) => {
    onEdit(item);
    setSelectedItem(null);
  };

  return (
    <>
      <DataTable value={data} responsiveLayout="scroll">
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
            <div className="flex gap-2">
              <Button
                icon="pi pi-pencil"
                className="p-button-text p-button-sm"
                tooltip="Edit"
                tooltipOptions={{ position: "top" }}
                onClick={() => setSelectedItem(rowData)}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-text p-button-sm p-button-danger"
                tooltip="Delete"
                tooltipOptions={{ position: "top" }}
                onClick={() => onDelete(rowData.id)}
              />
            </div>
          )}
        />
      </DataTable>

      <EditModal
        visible={!!selectedItem}
        onRequestClose={() => setSelectedItem(null)}
        item={selectedItem}
        onSave={onSave}
        options={selectedItem?.c || []}
      />
    </>
  );
};

export default TableComponent;
