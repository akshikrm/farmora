import { useForm, type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import item from "@api/item.api";
import type { NewPurchaseRequest } from "@app-types/item.types";

type Opts<T> = {
  defaultValues: T;
  onSuccess: () => void;
};

const useAddForm = <T extends FieldValues>(opts: Opts<T>) => {
  const { defaultValues, onSuccess } = opts;
  const methods = useForm<T>({ defaultValues: defaultValues as any });

  const onSubmit = async (payload: NewPurchaseRequest) => {
    const res = await item.create(payload);
    if (res.status === "validation_error") {
      res.error.forEach((error) => {
        methods.setError(error.name, { message: error.message });
      });
    } else if (res.status === "success") {
      toast.success("created successfully");
      onSuccess();
    }
  };

  return {
    methods,
    onSubmit,
  };
};

export default useAddForm;
