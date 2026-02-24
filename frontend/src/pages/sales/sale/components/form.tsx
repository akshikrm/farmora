import SelectList from "@components/select-list";
import useGetBatchNames from "@hooks/batch/use-get-batch-names";
import useGetSeasonNames from "@hooks/seasons/use-get-season-names";
import { TextField, Button, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import vendors from "@api/vendor.api";
import type { Vendor } from "@app-types/vendor.types";
import { useEffect, useMemo, useState } from "react";

type Props = {
  methods: any;
  onSubmit: (payload: any) => void;
};

const SaleForm = ({ methods, onSubmit }: Props) => {
  const {
    handleSubmit,
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

  const [averageWeight, setAverageWeight] = useState<number>(0.0);
  useEffect(() => {
    const iWeight = parseFloat(values.weight);
    const iBirdNo = parseFloat(values.bird_no);
    if (iBirdNo > 0) {
      const averageWeight = iWeight / iBirdNo;
      setAverageWeight(averageWeight);
    }
  }, [values.weight, values.bird_no]);

  console.log(averageWeight);

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectList
            options={seasonNames.data || []}
            value={values.season_id}
            onChange={(val) => {
              setValue("season_id", val);
            }}
            label="Season"
            name="season_id"
            error={Boolean((errors as any).season_id)}
            helperText={(errors as any).season_id?.message}
          />

          <SelectList
            options={batchNames.data || []}
            value={values.batch_id}
            onChange={(val) => {
              setValue("batch_id", val);
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
              setValue("date", dayjs(v).toISOString());
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
            value={values.buyer_id}
            onChange={(val) => {
              setValue("buyer_id", val);
            }}
            label="Buyer"
            name="buyer_id"
            error={Boolean((errors as any).buyer_id)}
            helperText={(errors as any).buyer_id?.message}
          />

          <TextField
            label="Vehicle Number"
            value={values.vehicle_no}
            name="vehicle_no"
            onChange={(e) => {
              const { name, value } = e.target;
              setValue(name, value);
            }}
            fullWidth
            error={Boolean(errors.vehicle_no)}
            helperText={errors.vehicle_no?.message}
            size="small"
          />

          <TextField
            label="Weight (kg)"
            type="number"
            value={values.number}
            name="weight"
            fullWidth
            onChange={(e) => {
              const { name, value } = e.target;
              setValue(name, value ? value : "");
            }}
            error={Boolean(errors.weight)}
            helperText={errors.weight?.message}
            size="small"
          />

          <TextField
            label="Number of Birds"
            type="number"
            value={values.bird_no}
            name="bird_no"
            onChange={(e) => {
              const { name, value } = e.target;
              setValue(name, value ? value : "");
            }}
            fullWidth
            error={Boolean(errors.bird_no)}
            helperText={errors.bird_no?.message}
            size="small"
          />

          <TextField
            label="AVG Weight"
            value={averageWeight}
            fullWidth
            disabled
            size="small"
          />

          <TextField
            label="Price per Unit"
            type="number"
            name="price"
            value={values.price}
            fullWidth
            onChange={(e) => {
              const { name, value } = e.target;
              setValue(name, value ? parseFloat(value) : "");
            }}
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
            size="small"
          />

          <TextField
            label="Payment Type"
            select
            value={values.payment_type}
            name="payment_type"
            fullWidth
            onChange={(e) => {
              const { name, value } = e.target;
              setValue(name, value ? value : "");
            }}
            error={Boolean(errors.payment_type)}
            helperText={errors.payment_type?.message}
            size="small"
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="credit">Credit</MenuItem>
          </TextField>

          <TextField
            label="Narration"
            value={values.narration}
            fullWidth
            name="narration"
            onChange={(e) => {
              const { name, value } = e.target;
              setValue(name, value ? value : "");
            }}
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
