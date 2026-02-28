import { useCallback } from "react";
import type { EmployeeFormValues, UseEditEmployee } from "../types";
import employee from "../api";

const useEditEmployee: UseEditEmployee = (selectedId, opts) => {
  const onSubmit = useCallback(
    async (inputData: EmployeeFormValues) => {
      if (!selectedId) return;
      const res = await employee.updateById(selectedId, inputData);
      if (res.status === "success") {
        opts.onSuccess();
      }
    },
    [selectedId],
  );

  return { onSubmit };
};

export default useEditEmployee;
