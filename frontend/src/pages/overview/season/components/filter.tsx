import { Button } from "@mui/material";
import SelectList from "@components/select-list";
import type { SeasonOverviewFilterRequest } from "@app-types/season-overview.types";
import type { FieldErrors, UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import seasons from "@api/seasons.api";
import type { Season } from "@app-types/season.types";
import { useMemo } from "react";

type Props = {
  onFilter: () => Promise<void>;
  onChange: (
    name: keyof SeasonOverviewFilterRequest,
    value: number | null,
  ) => void;
  register: UseFormReturn<SeasonOverviewFilterRequest>["register"];
  errors: FieldErrors<SeasonOverviewFilterRequest>;
  values: SeasonOverviewFilterRequest;
};

const FilterSeasonOverview = (props: Props) => {
  const seasonsList = useQuery<{ data: Season[] }>({
    queryKey: ["seasons:all"],
    queryFn: seasons.fetchAll,
  });

  const seasonsOptions = useMemo(() => {
    if (!seasonsList.data?.data) return [];
    return seasonsList.data.data.map((s) => ({ id: s.id, name: s.name }));
  }, [seasonsList.data]);

  const { errors, onChange, values } = props;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SelectList
          options={seasonsOptions}
          value={values.season_id}
          onChange={(val) => {
            onChange("season_id" as keyof SeasonOverviewFilterRequest, val);
          }}
          label="Season *"
          name="season_id"
          error={Boolean(errors.season_id)}
          helperText={errors.season_id?.message}
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

export default FilterSeasonOverview;
