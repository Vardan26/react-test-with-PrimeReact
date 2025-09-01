import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { Item } from "../types";

type Props = {
  selectedItem: Item | null;
  onSave: (item: Item) => void;
};

const defaultValues: Item = {
  id: 0,
  name: "",
  category: [],
};

export const useEditForm = ({ selectedItem, onSave }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm<Item>({
    defaultValues: selectedItem || defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (selectedItem) {
      reset(selectedItem);
    }
  }, [selectedItem, reset]);

  const submitHandler = handleSubmit((data: Item) => {
    onSave(data);
  });

  return { control, submitHandler, reset, isChanged: isDirty, isValid };
};
