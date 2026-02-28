import type { ListResponse } from "./response.types";

export type EmployeeFormValues = {
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

export type EmployeesListResponse = ListResponse<Employee>;
