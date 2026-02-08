import { TextField, Button } from "@mui/material";
import usetGetVendorNames from "@hooks/vendor/use-get-vendor-names";
import useGetItemCategoryNames from "@hooks/item-category/use-get-item-category-names";
import useGetBatchNames from "@hooks/batch/use-get-batch-names";
import SelectList from "@components/select-list";
import type { ItemFilterRequest } from "@app-types/item.types";
import type { FieldErrors, UseFormReturn } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type Props = {
  onFilter: () => Promise<void>;
  onChange: (
    name: keyof ItemFilterRequest,
    value: string | number | null,
  ) => void;
  register: UseFormReturn<ItemFilterRequest>["register"];
  errors: FieldErrors<ItemFilterRequest>;
  values: ItemFilterRequest;
};

const FilterItems = (props: Props) => {
  const vendorNames = usetGetVendorNames();
  const itemCategoryName = useGetItemCategoryNames();
  const batchNames = useGetBatchNames();

  const { register, errors, onChange, values } = props;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <TextField
          label="Name"
          {...register("name")}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          fullWidth
          size="small"
        />

        <SelectList
          options={vendorNames.data}
          value={values.vendor_id}
          onChange={(val) => {
            onChange("vendor_id" as keyof ItemFilterRequest, val);
          }}
          label="Vendor"
          name="vendor_id"
          error={Boolean(errors.vendor_id)}
          helperText={errors.vendor_id?.message}
        />

        <SelectList
          options={batchNames.data}
          value={values.batch_id}
          onChange={(val) => {
            onChange("batch_id" as keyof ItemFilterRequest, val);
          }}
          label="Batch"
          name="batch_id"
          error={Boolean(errors.batch_id)}
          helperText={errors.batch_id?.message}
        />

        <SelectList
          options={itemCategoryName.data}
          value={values.category_id}
          onChange={(val) => {
            onChange("category_id" as keyof ItemFilterRequest, val);
          }}
          label="Item"
          name="category_id"
          error={Boolean(errors.category_id)}
          helperText={errors.category_id?.message}
        />

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
        <Button
          variant="contained"
          onClick={async () => await props.onFilter()}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
export default FilterItems;
