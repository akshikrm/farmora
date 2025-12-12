import type { NameResponse } from "@app-types/gen.types";
import type { NewItemRequest, EditItemRequest } from "@app-types/item.types";
import SelectList from "@components/select-list";
import useGetBatchNames from "@hooks/batch/use-get-batch-names";
import useGetItemCategoryName from "@hooks/item-category/use-get-item-category-names";
import usetGetVendorNames from "@hooks/vendor/use-get-vendor-names";
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
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const batchNames = useGetBatchNames();
  const itemCategoryName = useGetItemCategoryName();
  const itemVendorName = usetGetVendorNames();
  const values = methods.watch();

  console.log("watch", watch());

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

          <SelectList
            options={itemVendorName.data as unknown as NameResponse[]}
            value={values.vendor_id}
            onChange={(name, val) => {
              setValue(name, val);
            }}
            label="Vendor"
            name="vendor_id"
            error={Boolean(errors.vendor_id)}
            helperText={errors.vendor_id?.message}
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

          <SelectList
            options={itemCategoryName.data as unknown as NameResponse[]}
            value={values.category_id}
            onChange={(name, val) => {
              setValue(name, val);
            }}
            label="Category"
            name="category_id"
            error={Boolean(errors.category_id)}
            helperText={errors.category_id?.message}
          />

          <SelectList
            options={batchNames.data as unknown as NameResponse[]}
            value={values.batch_id}
            onChange={(name, val) => {
              setValue(name, val);
            }}
            label="Batch"
            name="batch_id"
            error={Boolean(errors.batch_id)}
            helperText={errors.batch_id?.message}
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
