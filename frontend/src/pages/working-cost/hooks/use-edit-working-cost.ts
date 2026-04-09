import { useState } from "react";
import type { WorkingCostFormValues } from "../types";
import type { ValidationError } from "@errors/api.error";
import workingCost from "../api";

const useEditWorkingCost = (
  selectedId: number | null,
  onSuccess: () => void,
) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearErrors = () => setErrors([]);

  const onSubmit = async (inputData: WorkingCostFormValues) => {
    if (!selectedId) return;

    const res = await workingCost.updateById(selectedId, inputData);
    if (res.status === "success") {
      onSuccess();
      clearErrors();
    } else if (res.status === "validation_error") {
      setErrors(res.error);
    }
  };

  return { errors, onSubmit, clearErrors };
};

export default useEditWorkingCost;
