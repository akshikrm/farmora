import type { NewBatchRequest, EditBatchRequest } from "@app-types/batch.types";
import type { NameResponse } from "@app-types/gen.types";
import SelectList from "@components/select-list";
import usetGetFarmNames from "@hooks/farms/use-get-farm-names";
import useGetSeasonNames from "@hooks/seasons/use-get-season-names";
import { TextField, Button } from "@mui/material";
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
    formState: { errors },
  } = methods;

  const values = watch();

  return (
    <>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <TextField
            label="Name"
            {...(register as any)("name")}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />

          <SelectList
            options={seasonNames.data as unknown as NameResponse[]}
            value={values.season_id}
            onChange={(name, val) => {
              (setValue as any)(name, val);
            }}
            label="Season"
            name="season_id"
            error={Boolean(errors.season_id)}
            helperText={errors.season_id?.message}
          />

          <SelectList
            options={farmNames.data as unknown as NameResponse[]}
            value={values.farm_id}
            onChange={(name, val) => {
              (setValue as any)(name, val);
            }}
            label="Farm"
            name="farm_id"
            error={Boolean(errors.farm_id)}
            helperText={errors.farm_id?.message}
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

export default BatchForm;
