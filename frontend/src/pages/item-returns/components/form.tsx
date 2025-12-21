import type {
  NewItemReturnRequest,
  EditItemReturnRequest,
} from "@app-types/item-return.types";
import SelectList from "@components/select-list";
import useGetBatchNames from "@hooks/batch/use-get-batch-names";
import useGetItemCategoryName from "@hooks/item-category/use-get-item-category-names";
import usetGetVendorNames from "@hooks/vendor/use-get-vendor-names";
import { TextField, MenuItem, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type EditMethod = UseFormReturn<EditItemReturnRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewItemReturnRequest, any, FieldValues>;

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
};

const ItemReturnForm = ({ methods, onSubmit }: Props) => {
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

  const returnType = values.return_type;

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Return Type"
            {...(register as any)("return_type")}
            select
            fullWidth
            value={values.return_type}
            error={Boolean(errors.return_type)}
            helperText={errors.return_type?.message}
            size="small"
          >
            <MenuItem value="vendor">Vendor</MenuItem>
            <MenuItem value="batch">Batch</MenuItem>
          </TextField>

          <SelectList
            options={itemCategoryName.data}
            value={values.item_category_id}
            onChange={(name, val) => {
              (setValue as any)(name, val);
            }}
            label="Category"
            name="item_category_id"
            error={Boolean(errors.item_category_id)}
            helperText={errors.item_category_id?.message}
          />

          <DatePicker
            label="Return Date"
            name="date"
            value={values.date ? dayjs(values.date) : null}
            format="DD-MM-YYYY"
            onChange={(v) => {
              (setValue as any)("date", dayjs(v).toISOString());
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(errors.date),
                helperText: errors.date?.message,
                size: "small",
              },
            }}
          />

          <SelectList
            options={batchNames.data}
            value={values.from_batch}
            onChange={(name, val) => {
              (setValue as any)(name, val);
            }}
            label="From Batch"
            name="from_batch"
            error={Boolean(errors.from_batch)}
            helperText={errors.from_batch?.message}
          />

          {returnType === "batch" && (
            <SelectList
              options={batchNames.data}
              value={values.to_batch}
              onChange={(name, val) => {
                (setValue as any)(name, val);
              }}
              label="To Batch"
              name="to_batch"
              error={Boolean(errors.to_batch)}
              helperText={errors.to_batch?.message}
            />
          )}

          {returnType === "vendor" && (
            <SelectList
              options={itemVendorName.data}
              value={values.to_vendor}
              onChange={(name, val) => {
                (setValue as any)(name, val);
              }}
              label="To Vendor"
              name="to_vendor"
              error={Boolean(errors.to_vendor)}
              helperText={errors.to_vendor?.message}
            />
          )}

          <TextField
            label="Quantity"
            {...(register as any)("quantity")}
            type="number"
            fullWidth
            error={Boolean(errors.quantity)}
            helperText={errors.quantity?.message}
            size="small"
          />

          <TextField
            label="Rate Per Bag"
            {...(register as any)("rate_per_bag")}
            type="number"
            fullWidth
            error={Boolean(errors.rate_per_bag)}
            helperText={errors.rate_per_bag?.message}
            size="small"
          />

          <TextField
            label="Total Amount"
            {...(register as any)("total_amount")}
            type="number"
            fullWidth
            error={Boolean(errors.total_amount)}
            helperText={errors.total_amount?.message}
            size="small"
          />

          <TextField
            label="Status"
            {...(register as any)("status")}
            select
            value={values.status}
            fullWidth
            error={Boolean(errors.status)}
            helperText={errors.status?.message}
            size="small"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
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

export default ItemReturnForm;
