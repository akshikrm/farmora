import { useCallback, useState } from "react";
import type { BatchFormValues, UseEditBatch } from "../types";
import items from "../api";
import type { ValidationError } from "@errors/api.error";

const useEditBatch: UseEditBatch = (selectedId, opts) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearError = () => {
    setErrors([]);
  };

  const onSubmit = useCallback(
    async (inputData: BatchFormValues) => {
      if (!selectedId) return;
      const res = await items.updateById(selectedId, inputData);
      if (res.status === "success") {
        opts.onSuccess();
      } else if (res.status === "validation_error") {
        setErrors(res.error);
      }
    },
    [selectedId],
  );

  return {
    onSubmit,
    errors,
    clearError,
  };
};

export default useEditBatch;
