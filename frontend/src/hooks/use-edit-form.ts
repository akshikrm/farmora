import item from "@api/item.api";
import type { EditItemRequest } from "@app-types/item.types";
import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

type Opts<T> = {
  onSuccess: () => void;
  defaultValues: T;
};

const useEditForm = <T extends FieldValues>(opts: Opts<T>) => {
  const { defaultValues, onSuccess } = opts;
  const methods = useForm<T>();

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = async (payload: EditItemRequest) => {
    const res = await item.updateById(payload.id, payload);
    if (res.status === "validation_error") {
      res.error.forEach((error) => {
        methods.setError(error.name, { message: error.message });
      });
    } else if (res.status === "success") {
      toast.success("updated successfully");
      onSuccess();
    }
  };

  return { methods, onSubmit };
};

export default useEditForm;
