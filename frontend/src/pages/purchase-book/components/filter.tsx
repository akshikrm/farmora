import { Button } from "@mui/material";
import usetGetVendorNames from "@hooks/vendor/use-get-vendor-names";
import SelectList from "@components/select-list";
import type { PurchaseBookFilterRequest } from "@app-types/purchase-book.types";
import type { FieldErrors, UseFormReturn } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type Props = {
  onFilter: () => Promise<void>;
  onChange: (
    name: keyof PurchaseBookFilterRequest,
    value: string | number | null,
  ) => void;
  register: UseFormReturn<PurchaseBookFilterRequest>["register"];
  errors: FieldErrors<PurchaseBookFilterRequest>;
  values: PurchaseBookFilterRequest;
};

const FilterPurchaseBook = (props: Props) => {
  const vendorNames = usetGetVendorNames();

  const { errors, onChange, values } = props;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <SelectList
          options={vendorNames.data}
          value={values.vendor_id}
          onChange={(val) => {
            onChange("vendor_id" as keyof PurchaseBookFilterRequest, val);
          }}
          label="Vendor *"
          name="vendor_id"
          error={Boolean(errors.vendor_id)}
          helperText={errors.vendor_id?.message}
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
          disabled={!values.vendor_id}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
export default FilterPurchaseBook;
