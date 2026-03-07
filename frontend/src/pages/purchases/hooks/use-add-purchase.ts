import { useState } from "react";
import type { ValidationError } from "@errors/api.error";
import type { PurchaseFormValues, UseAddPurchase } from "../types";
import purchases from "../api";

const useAddPurchase: UseAddPurchase = (opts) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearError = () => {
    setErrors([]);
  };

  const onSubmit = async (inputData: PurchaseFormValues) => {
    const res = await purchases.create(inputData);
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

export default useAddPurchase;
