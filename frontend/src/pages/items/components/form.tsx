import type { NewItemRequest, EditItemRequest } from "@app-types/item.types";
import { Stack, TextField } from "@mui/material";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type EditMethod = UseFormReturn<EditItemRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewItemRequest, any, FieldValues>;

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
};

const ItemForm = ({ methods, onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            {...register("name")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            label="Total Price"
            {...register("total_price")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <TextField
            label="Quantity"
            {...register("quantity")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            label="Vendor"
            {...register("vendor_id")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            label="Discount Price"
            {...register("discount_price")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            label="Price Per Unit"
            {...register("price_per_unit")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            label="Category"
            {...register("category_id")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            label="Batch"
            {...register("batch_id")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            label="Assign Quantity"
            {...register("assign_quantity")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              type="submit"
            >
              submit
            </button>
          </div>
        </Stack>
      </form>
    </>
  );
};

export default ItemForm;
