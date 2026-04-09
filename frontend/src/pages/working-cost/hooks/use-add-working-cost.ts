import { useState } from "react";
import type { WorkingCostFormValues } from "../types";
import type { ValidationError } from "@errors/api.error";
import workingCost from "../api";

const useAddWorkingCost = (onSuccess: () => void) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearErrors = () => setErrors([]);

  const onSubmit = async (inputData: WorkingCostFormValues) => {
    const res = await workingCost.create(inputData);
    if (res.status === "success") {
      onSuccess();
      clearErrors();
    } else if (res.status === "validation_error") {
      setErrors(res.error);
    }
  };

  return { errors, onSubmit, clearErrors };
};

export default useAddWorkingCost;
