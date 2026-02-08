import type { NewSaleRequest, EditSaleRequest } from "@app-types/sales.types";
import SelectList from "@components/select-list";
import useGetBatchNames from "@hooks/batch/use-get-batch-names";
import useGetSeasonNames from "@hooks/seasons/use-get-season-names";
import { TextField, Button, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import vendors from "@api/vendor.api";
import type { Vendor } from "@app-types/vendor.types";
import { useMemo } from "react";

type EditMethod = UseFormReturn<EditSaleRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewSaleRequest, any, FieldValues>;

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
};

const SaleForm = ({ methods, onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods;

  const seasonNames = useGetSeasonNames();
  const batchNames = useGetBatchNames();

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

  const values = methods.watch();

  console.log(values.payment_type);

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectList
            options={seasonNames.data || []}
            value={(values as any).season_id}
            onChange={(val) => {
              (setValue as any)("season_id", val);
            }}
            label="Season"
            name="season_id"
            error={Boolean((errors as any).season_id)}
            helperText={(errors as any).season_id?.message}
          />

          <SelectList
            options={batchNames.data || []}
            value={(values as any).batch_id}
            onChange={(val) => {
              (setValue as any)("batch_id", val);
            }}
            label="Batch"
            name="batch_id"
            error={Boolean((errors as any).batch_id)}
            helperText={(errors as any).batch_id?.message}
          />

          <DatePicker
            label="Sale Date"
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
            options={buyersList}
            value={(values as any).buyer_id}
            onChange={(val) => {
              (setValue as any)("buyer_id", val);
            }}
            label="Buyer"
            name="buyer_id"
            error={Boolean((errors as any).buyer_id)}
            helperText={(errors as any).buyer_id?.message}
          />

          <TextField
            label="Vehicle Number"
            {...(register as any)("vehicle_no")}
            fullWidth
            error={Boolean(errors.vehicle_no)}
            helperText={errors.vehicle_no?.message}
            size="small"
          />

          <TextField
            label="Weight (kg)"
            type="number"
            {...(register as any)("weight")}
            fullWidth
            error={Boolean(errors.weight)}
            helperText={errors.weight?.message}
            size="small"
            inputProps={{ step: "0.01" }}
          />

          <TextField
            label="Number of Birds"
            type="number"
            {...(register as any)("bird_no")}
            fullWidth
            error={Boolean(errors.bird_no)}
            helperText={errors.bird_no?.message}
            size="small"
          />

          <TextField
            label="Price per Unit"
            type="number"
            {...(register as any)("price")}
            fullWidth
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
            size="small"
            inputProps={{ step: "0.01" }}
          />

          <TextField
            label="Payment Type"
            select
            value={values.payment_type}
            {...(register as any)("payment_type")}
            fullWidth
            error={Boolean(errors.payment_type)}
            helperText={errors.payment_type?.message}
            size="small"
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="credit">Credit</MenuItem>
          </TextField>

          <TextField
            label="Narration"
            {...(register as any)("narration")}
            fullWidth
            error={Boolean(errors.narration)}
            helperText={errors.narration?.message}
            size="small"
            multiline
            rows={2}
            className="md:col-span-2"
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

export default SaleForm;
