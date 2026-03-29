import { useState } from "react";
import type { ValidationError } from "@errors/api.error";
import type { SeasonFormValues, UseAddSeason } from "../types";
import seasons from "../api";

const useAddEmployee: UseAddSeason = (opts) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearError = () => {
    setErrors([]);
  };

  const onSubmit = async (inputData: SeasonFormValues) => {
    const res = await seasons.create(inputData);
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
