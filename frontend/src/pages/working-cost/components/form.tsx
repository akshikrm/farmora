import type { NewWorkingCostRequest } from "@app-types/working-cost.types";
import SelectList from "@components/select-list";
import useGetSeasonNames from "@hooks/seasons/use-get-season-names";
import { TextField, Button, MenuItem } from "@mui/material";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type AddMethod = UseFormReturn<NewWorkingCostRequest, any, FieldValues>;

type Props = {
  methods: AddMethod;
  onSubmit: (payload: any) => void;
};

const WorkingCostForm = ({ methods, onSubmit }: Props) => {
  const seasonNames = useGetSeasonNames();

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
            options={seasonNames.data}
            value={values.season_id}
            onChange={(name, val) => {
              (setValue as any)(name, val);
            }}
            label="Season"
            name="season_id"
            error={Boolean(errors.season_id)}
            helperText={errors.season_id?.message}
          />

          <TextField
            label="Purpose"
            {...(register as any)("purpose")}
            fullWidth
            error={Boolean(errors.purpose)}
            helperText={errors.purpose?.message}
            size="small"
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
            value={values.payment_type || "expense"}
            fullWidth
            error={Boolean(errors.payment_type)}
            helperText={errors.payment_type?.message}
            size="small"
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
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

export default WorkingCostForm;
