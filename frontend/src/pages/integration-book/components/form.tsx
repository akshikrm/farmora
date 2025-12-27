import type { NewIntegrationBookRequest } from "@app-types/integration-book.types";
import SelectList from "@components/select-list";
import usetGetFarmNames from "@hooks/farms/use-get-farm-names";
import { TextField, Button, MenuItem } from "@mui/material";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type AddMethod = UseFormReturn<NewIntegrationBookRequest, any, FieldValues>;

type Props = {
  methods: AddMethod;
  onSubmit: (payload: any) => void;
};

const IntegrationBookForm = ({ methods, onSubmit }: Props) => {
  const farmNames = usetGetFarmNames();

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const values = watch();

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <SelectList
            options={farmNames.data}
            value={values.farm_id}
            onChange={(name, val) => {
              (setValue as any)(name, val);
            }}
            label="Farm"
            name="farm_id"
            error={Boolean(errors.farm_id)}
            helperText={errors.farm_id?.message}
          />

          <TextField
            label="Amount"
            {...(register as any)("amount")}
            fullWidth
            type="number"
            error={Boolean(errors.amount)}
            helperText={errors.amount?.message}
            size="small"
          />

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

export default IntegrationBookForm;
