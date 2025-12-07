import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

type Opts<T> = {
  mutationKey: string;
  mutationFn: (id: number, payload: T) => Promise<T>;
  onSuccess: () => void;
  defaultValues: T;
};

const useEditForm = <T extends FieldValues>(opts: Opts<T>) => {
  const { defaultValues, mutationFn, mutationKey, onSuccess } = opts;
  const methods = useForm<T>();

  const mutation = useMutation({
    mutationFn: async (payload: T) => {
      return mutationFn(payload.id, payload);
    },
    mutationKey: [mutationKey],
    onSuccess: () => {
      toast.success("edited successfully");
      onSuccess();
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
