import type { EditEmployeeRequest, NewEmployeeRequest } from "@app-types/employees.types";
import Input from "@components/form/input";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@mui/material";

type EditMethod = UseFormReturn<EditEmployeeRequest, any, FieldValues>;
type AddMethod = UseFormReturn<NewEmployeeRequest, any, FieldValues>;

type Field = {
  name: "name" | "username" | "password" | "status";
  label: string;
  type: "text" | "password" | "select";
  placeholder: string;
};

type Fields = readonly Field[];

type Props = {
  methods: EditMethod | AddMethod;
  onSubmit: (payload: any) => void;
  fields: Fields;
};

const EmployeeForm = ({ methods, onSubmit, fields }: Props) => {
  return (
    <div>
      <form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
        {fields.map((field) => {
          return (
            <div className="mb-4">
              <Input {...field} methods={methods} />
            </div>
          );
        })}
        <div className="flex justify-end">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
