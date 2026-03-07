import { useCallback, useState } from "react";
import type { PurchaseFormValues, UseEditPurchase } from "../types";
import purchase from "../api";
import type { ValidationError } from "@errors/api.error";

const useEditPurchase: UseEditPurchase = (selectedId, opts) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearError = () => {
    setErrors([]);
  };

  const onSubmit = useCallback(
    async (inputData: PurchaseFormValues) => {
      if (!selectedId) return;
      const res = await purchase.updateById(selectedId, inputData);
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

export default useEditPurchase;
