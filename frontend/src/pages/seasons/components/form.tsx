import type { NewSeasonRequest, EditSeasonRequest } from "@app-types/season.types";
import { TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type EditMethod = UseFormReturn<EditSeasonRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewSeasonRequest, any, FieldValues>;

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
};

const SeasonForm = ({ methods, onSubmit }: Props) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = methods;
  return (
    <>
      <form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <TextField
            label="Name"
            {...(methods.register as any)("name")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <DatePicker
            label="From Date"
            name="invoice_date"
            value={dayjs((watch as any)("from_date"))}
            format="DD-MM-YYYY"
            onChange={(v) => {
              (setValue as any)("from_date", dayjs(v).toISOString());
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(errors.from_date),
                helperText: errors.from_date?.message,
                size: "small",
              },
            }}
          />
          <DatePicker
            label="To Date"
            name="to_date"
            value={dayjs((watch as any)("to_date"))}
            format="DD-MM-YYYY"
            onChange={(v) => {
              (setValue as any)("to_date", dayjs(v).toISOString());
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(errors.to_date),
                helperText: errors.to_date?.message,
                size: "small",
              },
            }}
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

export default SeasonForm;
