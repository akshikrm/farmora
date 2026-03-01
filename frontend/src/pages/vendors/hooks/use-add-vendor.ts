import type { ValidationError } from "@errors/api.error";
import vendors from "../api";
import type { VendorFormValues } from "../types";
import { useState } from "react";

type UseAddVendorOpts = {
  onSuccess: () => void;
};

const useAddVendor = (opts: UseAddVendorOpts) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearError = () => {
    setErrors([]);
  };

  const onSubmit = async (inputData: VendorFormValues) => {
    const res = await vendors.create(inputData);
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

export default useAddVendor;
