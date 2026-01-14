import { Button } from "@mui/material";
import SelectList from "@components/select-list";
import type { BatchOverviewFilterRequest } from "@app-types/batch-overview.types";
import type { FieldErrors, UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import seasons from "@api/seasons.api";
import batches from "@api/batches.api";
import type { Season } from "@app-types/season.types";
import type { Batch } from "@app-types/batch.types";
import { useMemo } from "react";

type Props = {
  onFilter: () => Promise<void>;
  onChange: (
    name: keyof BatchOverviewFilterRequest,
    value: number | null
  ) => void;
  register: UseFormReturn<BatchOverviewFilterRequest>["register"];
  errors: FieldErrors<BatchOverviewFilterRequest>;
  values: BatchOverviewFilterRequest;
};

const FilterBatchOverview = (props: Props) => {
  const seasonsList = useQuery<{ data: Season[] }>({
    queryKey: ["seasons:all"],
    queryFn: seasons.fetchAll,
  });

  const batchesList = useQuery<{ data: Batch[] }>({
    queryKey: ["batches:all"],
    queryFn: batches.fetchAll,
  });

  const seasonsOptions = useMemo(() => {
    if (!seasonsList.data?.data) return [];
    return seasonsList.data.data.map((s) => ({ id: s.id, name: s.name }));
  }, [seasonsList.data]);

  const batchesOptions = useMemo(() => {
    if (!batchesList.data?.data) return [];
    
    // Filter batches by selected season if season is selected
    let filteredBatches = batchesList.data.data;
    if (props.values.season_id) {
      filteredBatches = filteredBatches.filter(
        (b) => b.season.id === props.values.season_id
      );
    }
    
    return filteredBatches.map((b) => ({ id: b.id, name: b.name }));
  }, [batchesList.data, props.values.season_id]);

  const { errors, onChange, values } = props;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SelectList
          options={seasonsOptions}
          value={values.season_id}
          onChange={(name, val) => {
            onChange(name as keyof BatchOverviewFilterRequest, val);
            // Reset batch when season changes
            if (name === "season_id") {
              onChange("batch_id", null);
            }
          }}
          label="Season *"
          name="season_id"
          error={Boolean(errors.season_id)}
          helperText={errors.season_id?.message}
        />

        <SelectList
          options={batchesOptions}
          value={values.batch_id}
          onChange={(name, val) => {
            onChange(name as keyof BatchOverviewFilterRequest, val);
          }}
          label="Batch *"
          name="batch_id"
          error={Boolean(errors.batch_id)}
          helperText={errors.batch_id?.message}
          disabled={!values.season_id}
        />
      </div>

      <div className="flex justify-end">
        <Button
          variant="contained"
          onClick={async () => await props.onFilter()}
          disabled={!values.season_id || !values.batch_id}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBatchOverview;
