import type {
  EditEmployeePayload,
  EditEmployeeRequest,
  NewEmployeeRequest,
} from "@app-types/employees.types";
import fetcher from "@utils/fetcher";

const employee = {
  fetchAll: () => fetcher("users"),
  fetchById: (id: number) => fetcher(`users/${id}`),
  create: async (employeeData: NewEmployeeRequest) =>
    await fetcher("auth/signup", JSON.stringify(employeeData), { method: "POST" }),
  updateById: async (id: number, updateData: EditEmployeeRequest) => {
    const payload: EditEmployeePayload = {
      name: updateData.name as string,
      status: updateData.status as number,
    };
    return await fetcher(`farms/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default employee;
