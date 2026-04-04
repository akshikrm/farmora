import type { FarmFormValues } from "../types";
import type { ValidationError } from "@errors/api.error";
import { useState } from "react";
import farms from "../api";

const useAddFarm = (onSuccess: () => void) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearErrors = () => setErrors([]);

  const onSubmit = async (inputData: FarmFormValues) => {
    const res = await farms.create(inputData);
    if (res.status === "success") {
      if (res.data) {
        onSuccess();
        clearErrors();
      }
    } else if (res.status === "validation_error") {
      setErrors(res.error);
    }
  };

  return { errors, onSubmit, clearErrors };
};

export default useAddFarm;
