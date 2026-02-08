import { Button } from "@mui/material";
import useGetSeasonNames from "@hooks/seasons/use-get-season-names";
import SelectList from "@components/select-list";
import type { GeneralExpenseFilterRequest } from "@app-types/general-expense.types";
import type { FieldErrors, UseFormReturn } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type Props = {
  onFilter: () => Promise<void>;
  onChange: (
    name: keyof GeneralExpenseFilterRequest,
    value: string | number | null,
  ) => void;
  register: UseFormReturn<GeneralExpenseFilterRequest>["register"];
  errors: FieldErrors<GeneralExpenseFilterRequest>;
  values: GeneralExpenseFilterRequest;
};

const FilterGeneralExpense = (props: Props) => {
  const seasonNames = useGetSeasonNames();

  const { errors, onChange, values } = props;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <SelectList
          options={seasonNames.data}
          value={values.season_id}
          onChange={(val) => {
            onChange("season_id" as keyof GeneralExpenseFilterRequest, val);
          }}
          label="Season *"
          name="season_id"
          error={Boolean(errors.season_id)}
          helperText={errors.season_id?.message}
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
          disabled={!values.season_id}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
export default FilterGeneralExpense;
