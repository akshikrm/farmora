import type { EditFarmRequest, NewFarmRequest } from "@app-types/farms.types";
import Input from "@components/form/input";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@mui/material";

type EditMethod = UseFormReturn<EditFarmRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewFarmRequest, any, FieldValues>;

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
};

const farmFields = [
  { name: "name", label: "Name", placeholder: "name", type: "text" as const },
  { name: "place", label: "Place", placeholder: "place", type: "text" as const },
  { name: "capacity", label: "Capacity", placeholder: "capacity", type: "text" as const },
] as const;

const FarmForm = ({ methods, onSubmit }: Props) => {
  return (
    <>
      <form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
        {farmFields.map((field) => {
          return (
            <div className="mb-4">
              <Input {...field} methods={methods as any} />
            </div>
          );
        })}
        <div className="flex justify-end">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default FarmForm;
