import { Button } from "@mui/material";
import SelectList from "@components/select-list";
import type { SalesBookFilterRequest } from "@app-types/sales-book.types";
import type { FieldErrors, UseFormReturn } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import vendors from "@api/vendor.api";
import type { Vendor } from "@app-types/vendor.types";
import { useMemo } from "react";

type Props = {
  onFilter: () => Promise<void>;
  onChange: (
    name: keyof SalesBookFilterRequest,
    value: string | number | null,
  ) => void;
  register: UseFormReturn<SalesBookFilterRequest>["register"];
  errors: FieldErrors<SalesBookFilterRequest>;
  values: SalesBookFilterRequest;
};

const FilterSalesBook = (props: Props) => {
  // Fetch all vendors and filter buyers
  const vendorsList = useQuery<{ data: Vendor[] }>({
    queryKey: ["vendors:all"],
    queryFn: vendors.fetchAll,
  });

  const buyersList = useMemo(() => {
    if (!vendorsList.data?.data) return [];
    return vendorsList.data.data
      .filter((v) => v.vendor_type === "buyer")
      .map((v) => ({ id: v.id, name: v.name }));
  }, [vendorsList.data]);

  const { errors, onChange, values } = props;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <SelectList
          options={buyersList}
          value={values.buyer_id}
          onChange={(name, val) => {
            onChange(name as keyof SalesBookFilterRequest, val);
          }}
          label="Buyer *"
          name="buyer_id"
          error={Boolean(errors.buyer_id)}
          helperText={errors.buyer_id?.message}
        />

        <DatePicker
          label="From Date"
          value={values.from_date ? dayjs(values.from_date) : null}
          format="DD-MM-YYYY"
          onChange={(v) => {
            onChange("from_date", v ? dayjs(v).toISOString() : "");
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              error: Boolean(errors.from_date),
              helperText: errors.from_date?.message,
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
          disabled={!values.buyer_id}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSalesBook;
