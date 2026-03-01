import type { ValidationError } from "@errors/api.error";
import { useCallback, useState } from "react";
import type { UseEditVendor, VendorFormValues } from "../types";
import vendors from "../api";

const useEditVendor: UseEditVendor = (selectedId, opts) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearError = () => {
    setErrors([]);
  };

  const onSubmit = useCallback(
    async (inputData: VendorFormValues) => {
      if (!selectedId) return;
      const res = await vendors.updateById(selectedId, inputData);
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

export default useEditVendor;
