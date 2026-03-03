import { useState } from "react";
import type { ValidationError } from "@errors/api.error";
import type { ItemFormValues, UseAddItem } from "../types";
import items from "../api";

const useAddEmployee: UseAddItem = (opts) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearError = () => {
    setErrors([]);
  };

  const onSubmit = async (inputData: ItemFormValues) => {
    const res = await items.create(inputData);
    if (res.status === "success") {
      opts.onSuccess();
    } else if (res.status === "validation_error") {
      setErrors(res.error);
    }
  };

  return {
    onSubmit,
    errors,
    clearError,
  };
};

export default useAddEmployee;
