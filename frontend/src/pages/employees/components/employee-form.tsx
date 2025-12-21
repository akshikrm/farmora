import type { EditEmployeeRequest, NewEmployeeRequest } from "@app-types/employees.types";
import { TextField, MenuItem, Button } from "@mui/material";
import type { FieldValues, UseFormReturn } from "react-hook-form";

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
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods;

  const values = watch();

  return (
    <div>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          {fields.map((field) => {
            if (field.type === "select") {
              return (
                <TextField
                  key={field.name}
                  label={field.label}
                  {...(register as any)(field.name)}
                  select
                  fullWidth
                  value={(values as any)[field.name] || ""}
                  error={Boolean((errors as any)[field.name])}
                  helperText={(errors as any)[field.name]?.message}
                  size="small"
                >
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
                </TextField>
              );
            }
            return (
              <TextField
                key={field.name}
                label={field.label}
                type={field.type}
                {...(register as any)(field.name)}
                fullWidth
                error={Boolean((errors as any)[field.name])}
                helperText={(errors as any)[field.name]?.message}
                size="small"
              />
            );
          })}
        </div>
        <div className="flex justify-end mt-6">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
