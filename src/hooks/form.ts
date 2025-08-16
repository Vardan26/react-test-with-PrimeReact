import { useForm, Controller, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import type { Item } from "../types";

type Props = {
  selectedItem: Item | null;
  onSave: (item: Item) => void;
};

const defaultValues: Item = {
  id: 0,
  n: "",
  c: [],
};

export const useEditForm = ({ selectedItem, onSave }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isValid },
  } = useForm<Item>({
    defaultValues: selectedItem || defaultValues,
    mode: "onChange",
  });

  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (selectedItem) {
      reset(selectedItem);
    }
  }, [selectedItem, reset]);

  const submitHandler = handleSubmit((data: Item) => {
    onSave(data);
  });

  const isChanged = useMemo(() => {
    if (!selectedItem) return false;

    const current = getValues();

    return (
      current.n !== selectedItem.n ||
      JSON.stringify(current.c) !== JSON.stringify(selectedItem.c)
    );
  }, [getValues, selectedItem, watchedValues]);

  return { control, submitHandler, reset, isChanged, isValid };
};
