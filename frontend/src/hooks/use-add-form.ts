import { useMutation } from "@tanstack/react-query";
import { useForm, type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

type Opts<T> = {
  defaultValues: T;
  mutationKey: string;
  mutationFn: (payload: T) => Promise<T>;
  onSuccess: () => void;
};

const useAddForm = <T extends FieldValues>(opts: Opts<T>) => {
  const { defaultValues, mutationFn, mutationKey, onSuccess } = opts;
  const methods = useForm<T>({ defaultValues });

  const mutation = useMutation({
    mutationFn: async (newFarm: T) => mutationFn(newFarm),
    mutationKey: [mutationKey],
    onSuccess: (newFarm) => {
      toast.success(`${newFarm.name} created successfully`);
      onSuccess();
    },
  });

  const onSubmit = (payload: T) => {
    mutation.mutate(payload);
  };

  return {
    methods,
    onSubmit,
  };
};

export default useAddForm;
