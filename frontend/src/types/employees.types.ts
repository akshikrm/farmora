import type { ListResponse } from "./response.types";

export type NewEmployeeRequest = {
  name: string;
  username: string;
  password: string;
  package_id: number;
  status: number;
};

export type EditEmployeeRequest = Partial<Omit<NewEmployeeRequest, "password">> & {
  id: number;
};

export type EditEmployeePayload = {
  name: string;
  status: number;
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
