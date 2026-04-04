import type { FarmFormValues } from "../types";
import farms from "../api";
import { useCallback, useState } from "react";
import type { ValidationError } from "@errors/api.error";

const useEditFarm = (selectedId: number | null, onSuccess: () => void) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearErrors = () => {
    setErrors([]);
  };

  const onSubmit = useCallback(
    async (inputData: FarmFormValues) => {
      if (!selectedId) {
        return;
      }
      const res = await farms.updateById(selectedId, inputData);
      if (res.status === "success") {
        onSuccess();
      } else if (res.status === "validation_error") {
        setErrors(res.error);
      }
    },
    [selectedId],
  );

  return { onSubmit, clearErrors, errors };
};

export default useEditFarm;
