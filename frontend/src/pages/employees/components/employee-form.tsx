import type { EmployeeFormValues } from "@app-types/employees.types";
import Ternary from "@components/ternary";
import { TextField, Button } from "@mui/material";
import { useForm, type DefaultValues } from "react-hook-form";

type Props = {
  defaultValues: DefaultValues<EmployeeFormValues>;
  onSubmit: (payload: any) => void;
  hidePassword?: boolean;
};

const EmployeeForm = (props: Props) => {
  const { onSubmit, defaultValues, hidePassword } = props;

  const methods = useForm<EmployeeFormValues>({
    defaultValues,
  });

  const { handleSubmit, register } = methods;

  return (
    <div>
      <form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <TextField
            label="Name"
            type="text"
            placeholder="name"
            {...register("name")}
          />
          <TextField
            label="Username"
            type="text"
            placeholder="username"
            {...register("username")}
          />
          <Ternary
            when={!hidePassword}
            then={
              <TextField
                label="Password"
                placeholder="password"
                {...register("password")}
              />
            }
          />
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
