import type { NewSeasonRequest, EditSeasonRequest } from "@app-types/season.types";
import { Stack, TextField, Button } from "@mui/material";
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
        <Stack spacing={2}>
          <TextField
            label="Name"
            {...(methods.register as any)("name")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
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
                error: Boolean(errors.from_date),
                helperText: errors.from_date?.message,
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
                error: Boolean(errors.to_date),
                helperText: errors.to_date?.message,
              },
            }}
          />
          <div className="flex justify-end">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </Stack>
      </form>
    </>
  );
};

export default SeasonForm;
