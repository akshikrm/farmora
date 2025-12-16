import type { NewItemRequest, EditItemRequest } from "@app-types/item.types";
import SelectList from "@components/select-list";
import useGetBatchNames from "@hooks/batch/use-get-batch-names";
import useGetItemCategoryName from "@hooks/item-category/use-get-item-category-names";
import usetGetVendorNames from "@hooks/vendor/use-get-vendor-names";
import { TextField } from "@mui/material";
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Name"
            {...(register as any)("name")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <TextField
            label="Total Price"
            {...(register as any)("total_price")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <TextField
            label="Net amount"
            {...(register as any)("net_amount")}
            fullWidth
            error={Boolean((errors as any).net_amount)}
            helperText={(errors as any).net_amount?.message}
            size="small"
          />
          <TextField
            label="Invoice Number"
            {...(register as any)("invoice_number")}
            fullWidth
            error={Boolean(errors.invoice_number)}
            helperText={errors.invoice_number?.message}
            size="small"
          />
          <DatePicker
            label="Invoice Date"
            name="invoice_date"
            value={values.invoice_date ? dayjs(values.invoice_date) : null}
            format="DD-MM-YYYY"
            onChange={(v) => {
              (setValue as any)("invoice_date", dayjs(v).toISOString());
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(errors.invoice_date),
                helperText: errors.invoice_date?.message,
                size: "small",
              },
            }}
          />
          <TextField
            label="Quantity"
            {...(register as any)("quantity")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <TextField
            label="Discount Price"
            {...(register as any)("discount_price")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <TextField
            label="Price Per Unit"
            {...(register as any)("price_per_unit")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <SelectList
            options={batchNames.data}
            value={values.batch_id}
            onChange={(name, val) => {
              (setValue as any)(name, val);
            }}
            label="Batch"
            name="batch_id"
            error={Boolean(errors.batch_id)}
            helperText={errors.batch_id?.message}
          />
          <TextField
            label="Assign Quantity"
            {...(register as any)("assign_quantity")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <SelectList
            options={itemCategoryName.data}
            value={values.category_id}
            onChange={(name, val) => {
              (setValue as any)(name, val);
            }}
            label="Category"
            name="category_id"
            error={Boolean(errors.category_id)}
            helperText={errors.category_id?.message}
          />

          <SelectList
            options={itemVendorName.data}
            value={values.vendor_id}
            onChange={(name, val) => {
              (setValue as any)(name, val);
            }}
            label="Vendor"
            name="vendor_id"
            error={Boolean(errors.vendor_id)}
            helperText={errors.vendor_id?.message}
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ItemForm;
