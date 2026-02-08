// import type { NewItemRequest, EditItemRequest } from "@app-types/item.types";
import SelectList from "@components/select-list";
import Ternary from "@components/ternary";
import useGetBatchNames from "@hooks/batch/use-get-batch-names";
import useGetItemCategoryName from "@hooks/item-category/use-get-item-category-names";
import usetGetVendorNames from "@hooks/vendor/use-get-vendor-names";
import { TextField, Button, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

// type ItemRequest = EditItemRequest | NewItemRequest;

// type EditMethod = UseFormReturn<ItemRequest, any, FieldValues>;
// type AddMethod = UseFormReturn<ItemRequest, any, FieldValues>;

type Props = {
  methods: any;
  onSubmit: (payload: any) => void;
};

const ItemForm = ({ methods, onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const batchNames = useGetBatchNames();
  const itemCategoryName = useGetItemCategoryName();
  const itemVendorName = usetGetVendorNames();
  const values = methods.watch();

  const selectedCategoryId = watch("category_id") as number;

  const [hidePaymentType, setHidePaymentType] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCategoryId) {
      if (itemCategoryName.data) {
        const selected = itemCategoryName.data.find((item) => {
          return item.id === selectedCategoryId;
        });
        if (selected?.type === "integration") {
          setValue("payment_type", "credit");
          setHidePaymentType(true);
          return;
        }
      }
    }
    setHidePaymentType(false);
  }, [selectedCategoryId]);

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
            onChange={(val) => {
              (setValue as any)("batch_id", val);
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
            onChange={(val) => {
              (setValue as any)("category_id", val);
            }}
            label="Category"
            name="category_id"
            error={Boolean(errors.category_id)}
            helperText={errors.category_id?.message}
          />

          <SelectList
            options={itemVendorName.data}
            value={values.vendor_id}
            onChange={(val) => {
              (setValue as any)("vendor_id", val);
            }}
            label="Vendor"
            name="vendor_id"
            error={Boolean(errors.vendor_id)}
            helperText={errors.vendor_id?.message}
          />
          <Ternary
            when={!hidePaymentType}
            then={
              <TextField
                select
                label="Payment Type"
                {...(register as any)("payment_type")}
                value={values.payment_type || "credit"}
                fullWidth
                error={Boolean(errors.payment_type)}
                helperText={errors.payment_type?.message}
                size="small"
              >
                <MenuItem value="credit">Credit</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </TextField>
            }
          />
        </div>
        <div className="flex justify-end mt-6">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default ItemForm;
