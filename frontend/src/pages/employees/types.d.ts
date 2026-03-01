import type { ListResponse } from "@app-types/response.types";

type EmployeeFormValues = {
  name: string;
  username: string;
  password?: string;
};

type Employee = {
  id: number;
  name: string;
  username: string;
  parent_id: number;
  reset_flag: boolean;
  user_type: string;
};

type EmployeesListResponse = ListResponse<Employee>;

type UseEmployeeReturn = {
  onSubmit: (inputData: EmployeeFormValues) => void;
  errors: ValidationError[];
  clearError: () => void;
};

type Opts = {
  onSuccess: () => void;
};

type UseAddEmployee = (opts: Opts) => UseEmployeeReturn;

type UseEditEmployee = (
  selectedId: number | null,
  opts: Opts,
) => UseEmployeeReturn;
