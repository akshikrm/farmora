import type { NewBatchRequest, EditBatchRequest } from "@app-types/batch.types";
import usetGetFarmNames from "@hooks/farms/use-get-farm-names";
import useGetSeasonNames from "@hooks/seasons/use-get-season-names";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { useEffect, useMemo } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type EditMethod = UseFormReturn<EditBatchRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewBatchRequest, any, FieldValues>;

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
};

const BatchForm = ({ methods, onSubmit }: Props) => {
  const seasonNames = useGetSeasonNames();
  const farmNames = usetGetFarmNames();

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
  } = methods;

  const values = watch();

  const selectedSeason = useMemo(() => {
    if (values.season_id) {
      return seasonNames.data?.find(({ id }) => {
        return id === values.season_id;
      });
    }
    return null;
  }, [values.season_id, seasonNames.data]);

  const selectedFarm = useMemo(() => {
    if (values.farm_id) {
      return farmNames.data?.find(({ id }) => {
        return id === values.farm_id;
      });
    }
    return null;
  }, [values.farm_id, farmNames.data]);

  useEffect(() => {
    if (selectedFarm) {
      clearErrors("farm_id");
    }
  }, [selectedFarm]);

  useEffect(() => {
    if (selectedSeason) {
      clearErrors("season_id");
    }
  }, [selectedSeason]);

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            {...register("name")}
            fullWidth
            j
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <Autocomplete
            options={seasonNames.data}
            getOptionLabel={(v) => v.name}
            value={selectedSeason}
            onChange={(_, v) => {
              setValue("season_id", v.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Season"
                j
                error={Boolean(errors.season_id)}
                helperText={errors.season_id?.message}
              />
            )}
          />

          <Autocomplete
            options={farmNames.data}
            getOptionLabel={(v) => v.name}
            value={selectedFarm}
            onChange={(_, v) => {
              setValue("farm_id", v.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Farm"
                error={Boolean(errors.farm_id)}
                helperText={errors.farm_id?.message}
              />
            )}
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

export default BatchForm;
