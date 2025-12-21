import { TextField, MenuItem, Button } from "@mui/material";
import usetGetVendorNames from "@hooks/vendor/use-get-vendor-names";
import useGetItemCategoryNames from "@hooks/item-category/use-get-item-category-names";
import useGetBatchNames from "@hooks/batch/use-get-batch-names";
import SelectList from "@components/select-list";
import type { ItemReturnFilterRequest } from "@app-types/item-return.types";
import type { FieldErrors, UseFormReturn } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type Props = {
  onFilter: () => Promise<void>;
  onChange: (name: keyof ItemReturnFilterRequest, value: string | number | null) => void;
  register: UseFormReturn<ItemReturnFilterRequest>["register"];
  errors: FieldErrors<ItemReturnFilterRequest>;
  values: ItemReturnFilterRequest;
};

const FilterItemReturns = (props: Props) => {
  const vendorNames = usetGetVendorNames();
  const itemCategoryName = useGetItemCategoryNames();
  const batchNames = useGetBatchNames();

  const { register, errors, onChange, values } = props;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <TextField
          label="Return Type"
          {...register("return_type")}
          select
          error={Boolean(errors.return_type)}
          helperText={errors.return_type?.message}
          fullWidth
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="vendor">Vendor</MenuItem>
          <MenuItem value="batch">Batch</MenuItem>
        </TextField>

        <SelectList
          options={itemCategoryName.data}
          value={values.item_category_id}
          onChange={(name, val) => {
            onChange(name as keyof ItemReturnFilterRequest, val);
          }}
          label="Category"
          name="item_category_id"
          error={Boolean(errors.item_category_id)}
          helperText={errors.item_category_id?.message}
        />

        <SelectList
          options={batchNames.data}
          value={values.from_batch}
          onChange={(name, val) => {
            onChange(name as keyof ItemReturnFilterRequest, val);
          }}
          label="From Batch"
          name="from_batch"
          error={Boolean(errors.from_batch)}
          helperText={errors.from_batch?.message}
        />

        <SelectList
          options={batchNames.data}
          value={values.to_batch}
          onChange={(name, val) => {
            onChange(name as keyof ItemReturnFilterRequest, val);
          }}
          label="To Batch"
          name="to_batch"
          error={Boolean(errors.to_batch)}
          helperText={errors.to_batch?.message}
        />

        <SelectList
          options={vendorNames.data}
          value={values.to_vendor}
          onChange={(name, val) => {
            onChange(name as keyof ItemReturnFilterRequest, val);
          }}
          label="To Vendor"
          name="to_vendor"
          error={Boolean(errors.to_vendor)}
          helperText={errors.to_vendor?.message}
        />

        <TextField
          label="Status"
          {...register("status")}
          select
          error={Boolean(errors.status)}
          helperText={errors.status?.message}
          fullWidth
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </TextField>

        <DatePicker
          label="Start Date"
          value={values.start_date ? dayjs(values.start_date) : null}
          format="DD-MM-YYYY"
          onChange={(v) => {
            onChange("start_date", v ? dayjs(v).toISOString() : "");
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              error: Boolean(errors.start_date),
              helperText: errors.start_date?.message,
            },
          }}
        />

        <DatePicker
          label="End Date"
          value={values.end_date ? dayjs(values.end_date) : null}
          format="DD-MM-YYYY"
          onChange={(v) => {
            onChange("end_date", v ? dayjs(v).toISOString() : "");
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              error: Boolean(errors.end_date),
              helperText: errors.end_date?.message,
            },
          }}
        />
      </div>

      <div className="flex justify-end">
        <Button variant="contained" onClick={async () => await props.onFilter()}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterItemReturns;
