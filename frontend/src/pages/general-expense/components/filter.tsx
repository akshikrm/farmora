import { Button } from "@mui/material";
import useGetSeasonNames from "@hooks/use-get-season-names";
import SelectList from "@components/select-list";
import type { GeneralExpenseFilterRequest } from "@app-types/general-expense.types";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect } from "react";

type Props = {
  onFilter: (inpuData: GeneralExpenseFilterRequest) => Promise<void>;
};

const FilterGeneralExpense = (props: Props) => {
  const methods = useForm<GeneralExpenseFilterRequest>({
    defaultValues: {
      season_id: null,
      start_date: "",
      end_date: "",
    },
  });
  const {
    formState: { errors },
    watch,
    setValue,
    getValues,
    handleSubmit,
  } = methods;

  const seasonNames = useGetSeasonNames();
  const values = watch();

  const handleFilter = handleSubmit(async (inputData) => {
    props.onFilter(inputData);
  });

  useEffect(() => {
    document.addEventListener("general_expense:refetch", () => {
      const filter = getValues();
      props.onFilter(filter);
    });
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <SelectList
          options={seasonNames.data}
          value={values.season_id}
          onChange={(val) => {
            setValue("season_id", val);
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
            setValue("start_date", v ? dayjs(v).toISOString() : "");
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
            setValue("end_date", v ? dayjs(v).toISOString() : "");
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
          onClick={handleFilter}
          disabled={!values.season_id}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
export default FilterGeneralExpense;
