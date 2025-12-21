import type { EditFarmRequest, NewFarmRequest } from "@app-types/farms.types";
import { TextField, Button } from "@mui/material";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type EditMethod = UseFormReturn<EditFarmRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewFarmRequest, any, FieldValues>;

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
};

const FarmForm = ({ methods, onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

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
          <TextField
            label="Place"
            {...(register as any)("place")}
            fullWidth
            error={Boolean(errors.place)}
            helperText={errors.place?.message}
            size="small"
          />
          <TextField
            label="Capacity"
            {...(register as any)("capacity")}
            fullWidth
            error={Boolean(errors.capacity)}
            helperText={errors.capacity?.message}
            size="small"
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

export default FarmForm;
