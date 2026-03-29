import { useCallback, useState } from "react";
import type { SeasonFormValues, UseEditSeason } from "../types";
import seasons from "../api";
import type { ValidationError } from "@errors/api.error";

const useEditSeason: UseEditSeason = (selectedId, opts) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearError = () => {
    setErrors([]);
  };

  const onSubmit = useCallback(
    async (inputData: SeasonFormValues) => {
      if (!selectedId) return;
      const res = await seasons.updateById(selectedId, inputData);
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

export default useEditSeason;
