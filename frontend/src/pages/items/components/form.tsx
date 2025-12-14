import type { NewItemRequest, EditItemRequest } from "@app-types/item.types";
import SelectList from "@components/select-list";
import useGetBatchNames from "@hooks/batch/use-get-batch-names";
import useGetItemCategoryName from "@hooks/item-category/use-get-item-category-names";
import usetGetVendorNames from "@hooks/vendor/use-get-vendor-names";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
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
    setValue,
    formState: { errors },
  } = methods;

  const batchNames = useGetBatchNames();
  const itemCategoryName = useGetItemCategoryName();
  const itemVendorName = usetGetVendorNames();
  const values = methods.watch();

  console.log(values);
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
            label="Net amount"
            {...register("net_amount")}
            fullWidth
            error={Boolean(errors.net_price)}
            helperText={errors.net_amount?.message}
          />
          <TextField
            label="Invoice Number"
            {...register("invoice_number")}
            fullWidth
            error={Boolean(errors.invoice_number)}
            helperText={errors.invoice_number?.message}
          />
          <DatePicker
            label="Invoice Date"
            name="invoice_date"
            value={values.invoice_date ? dayjs(values.invoice_date) : null}
            format="DD-MM-YYYY"
            onChange={(v) => {
              setValue("invoice_date", dayjs(v).toISOString());
            }}
            slotProps={{
              textField: {
                error: Boolean(errors.invoice_date),
                helperText: errors.invoice_date?.message,
              },
            }}
          />
          <TextField
            label="Quantity"
            {...register("quantity")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <SelectList
            options={itemVendorName.data}
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
            options={itemCategoryName.data}
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
            options={batchNames.data}
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
