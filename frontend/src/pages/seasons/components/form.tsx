import type { NewSeasonRequest, EditSeason } from "@app-types/season.types";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type EditMethod = UseFormReturn<EditSeason, any, FieldValues>;
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
            {...methods.register("name")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <DatePicker
            label="From Date"
            name="from_date"
            value={dayjs(watch("from_date"))}
            format="DD-MM-YYYY"
            onChange={(v) => {
              setValue("from_date", dayjs(v).toISOString());
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
            value={dayjs(watch("to_date"))}
            format="DD-MM-YYYY"
            onChange={(v) => {
              setValue("to_date", dayjs(v).toISOString());
            }}
            slotProps={{
              textField: {
                error: Boolean(errors.to_date),
                helperText: errors.to_date?.message,
              },
            }}
          />
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              type="submit"
            >
              submit
            </button>
          </div>
        </Stack>
      </form>
    </>
  );
};

export default SeasonForm;
