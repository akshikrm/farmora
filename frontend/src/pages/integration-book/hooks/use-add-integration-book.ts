import { useState } from "react";
import type { IntegrationBookFormValues } from "../types";
import type { ValidationError } from "@errors/api.error";
import integrationBook from "../api";

const useAddIntegrationBook = (onSuccess: () => void) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const clearErrors = () => setErrors([]);

  const onSubmit = async (inputData: IntegrationBookFormValues) => {
    const res = await integrationBook.create(inputData);
    if (res.status === "success") {
      onSuccess();
      clearErrors();
    } else if (res.status === "validation_error") {
      setErrors(res.error);
    }
  };

  return { errors, onSubmit, clearErrors };
};

export default useAddIntegrationBook;
