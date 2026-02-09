import { ValidationError } from "@errors/api.error";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

type Opts<T> = {
  mutationKey: string;
  mutationFn: (id: number, payload: T) => Promise<T>;
  onSuccess: () => void;
  onError?: (err: Error) => void;
  defaultValues: T;
};

const useEditForm = <T extends FieldValues>(opts: Opts<T>) => {
  const { defaultValues, mutationFn, mutationKey, onSuccess } = opts;
  const methods = useForm<T>();

  const mutation = useMutation({
    mutationFn: async (payload: T) => {
      return mutationFn((payload as any).id, payload);
    },
    mutationKey: [mutationKey],
    onSuccess: () => {
      toast.success("edited successfully");
      onSuccess();
    },
    onError: (err: any) => {
      if (err instanceof ValidationError) {
        err.error.map((error: any) => {
          methods.setError(error.name as any, { message: error.message });
        });
      }
    },
  });

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = (payload: T) => {
    mutation.mutate(payload);
  };

  return { methods, onSubmit };
};

export default useEditForm;
