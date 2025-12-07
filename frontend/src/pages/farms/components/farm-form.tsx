import type { EditFarmRequest, NewFarmRequest } from "@app-types/farms.types";
import Input from "@components/form/input";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type EditMethod = UseFormReturn<EditFarmRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewFarmRequest, any, FieldValues>;

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
};

const farmFields = [
  { name: "name", label: "Name", placeholder: "name" },
  { name: "place", label: "Place", placeholder: "place" },
  { name: "capacity", label: "Capacity", placeholder: "capacity" },
] as const;

const FarmForm = ({ methods, onSubmit }: Props) => {
  return (
    <>
      <form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
        {farmFields.map((field) => {
          return (
            <div className="mb-4">
              <Input {...field} methods={methods} />
            </div>
          );
        })}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    </>
  );
};

export default FarmForm;
