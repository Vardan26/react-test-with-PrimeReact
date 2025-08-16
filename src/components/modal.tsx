import React from "react";
import { Controller } from "react-hook-form";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";

import { useEditForm } from "../hooks/form";
import type { Item } from "../types";

type Props = {
  visible: boolean;
  onRequestClose: () => void;
  item: Item | null;
  onSave: (item: Item) => void;
  options: string[];
};

const EditModal = ({
  visible,
  onRequestClose,
  item,
  onSave,
  options,
}: Props) => {
  const { control, submitHandler, isChanged, isValid } = useEditForm({
    selectedItem: item,
    onSave,
  });

  return (
    <Dialog header="Edit Item" visible={visible} onHide={onRequestClose} modal>
      <form onSubmit={submitHandler} className="p-fluid">
        <div className="p-field">
          <label htmlFor="n">Name</label>
          <Controller
            name="n"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field, fieldState }) => (
              <>
                <InputText
                  id="n"
                  {...field}
                  className={fieldState.invalid ? "p-invalid" : ""}
                />
                {fieldState.error && (
                  <small className="p-error">{fieldState.error.message}</small>
                )}
              </>
            )}
          />
        </div>

        <div className="p-field">
          <label htmlFor="c">Category</label>
          <Controller
            name="c"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field, fieldState }) => (
              <>
                <MultiSelect
                  {...field}
                  options={options}
                  display="chip"
                  className={fieldState.invalid ? "p-invalid" : ""}
                />
                {fieldState.error && (
                  <small className="p-error">{fieldState.error.message}</small>
                )}
              </>
            )}
          />
        </div>

        <div className="flex gap-2 mt-2">
          <Button
            label="Cancel"
            type="button"
            onClick={onRequestClose}
            className="p-button-secondary"
          />
          <Button
            label="Save"
            type="submit"
            className="p-button-primary"
            disabled={!isChanged || !isValid}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default EditModal;
