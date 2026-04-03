import { Button } from "@mui/material";
import SelectList from "@components/select-list";
import type { SeasonOverviewFilterRequest } from "../types";
import { useForm } from "react-hook-form";
import useGetSeasonNames from "@hooks/use-get-season-names";

type Props = {
  onFilter: (filter: SeasonOverviewFilterRequest) => Promise<void>;
};

const FilterSeasonOverview = (props: Props) => {
  const methods = useForm<SeasonOverviewFilterRequest>({
    defaultValues: { season_id: null },
  });

  const {
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
  } = methods;
  const seasonId = watch("season_id");

  const seasonNames = useGetSeasonNames();

  const handleFilter = handleSubmit(async (inputData) => {
    props.onFilter(inputData);
  });

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SelectList
          options={seasonNames.data}
          value={seasonId}
          onChange={(val) => {
            setValue("season_id", val);
          }}
          label="Season *"
          name="season_id"
          error={Boolean(errors.season_id)}
          helperText={errors.season_id?.message}
        />
      </div>

      <div className="flex justify-end">
        <Button variant="contained" onClick={handleFilter} disabled={!seasonId}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSeasonOverview;
