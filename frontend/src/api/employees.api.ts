import type {
  EmployeeFormValues,
  EmployeesListResponse,
} from "@app-types/employees.types";
import fetcherV2 from "@utils/fetcherV2";

const employee = {
  fetchAll: () => fetcherV2<EmployeesListResponse>("users"),
  fetchById: async (id: number) => {
    return fetcherV2<EmployeeFormValues>(`users/${id}`);
  },
  create: async (payload: EmployeeFormValues) =>
    await fetcherV2<EmployeeFormValues>("users", JSON.stringify(payload), {
      method: "POST",
    }),
  updateById: async (id: number, payload: EmployeeFormValues) => {
    const requestData: EmployeeFormValues = {
      name: payload.name,
      username: payload.username,
    };
    return await fetcherV2(`users/${id}`, JSON.stringify(requestData), {
      method: "PUT",
    });
  },
};

export default employee;
