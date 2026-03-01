import { useCallback, useState } from "react";
import type { EmployeeFormValues, UseEditEmployee } from "../types";
import employee from "../api";
import type { ValidationError } from "@errors/api.error";

const useEditEmployee: UseEditEmployee = (selectedId, opts) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearError = () => {
    setErrors([]);
  };

  const onSubmit = useCallback(
    async (inputData: EmployeeFormValues) => {
      if (!selectedId) return;
      const res = await employee.updateById(selectedId, inputData);
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

export default useEditEmployee;
