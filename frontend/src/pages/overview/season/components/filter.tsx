import { Button } from "@mui/material";
import SelectList from "@components/select-list";
import type { SeasonOverviewFilterRequest } from "../types";
import { useForm } from "react-hook-form";
import useGetSeasonNames from "@hooks/use-get-season-names";
import { useEffect } from "react";

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
    getValues,
  } = methods;
  const seasonId = watch("season_id");

  const seasonNames = useGetSeasonNames();

  const handleFilter = handleSubmit(async (inputData) => {
    props.onFilter(inputData);
  });

  useEffect(() => {
    document.addEventListener("batchOverview:batch-closed", () => {
      const values = getValues();
      props.onFilter(values);
    });
  }, []);

  return (
    <div className="flex items-center justify-between w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="w-[50%]">
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
      <div>
        <Button variant="contained" onClick={handleFilter} disabled={!seasonId}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSeasonOverview;
