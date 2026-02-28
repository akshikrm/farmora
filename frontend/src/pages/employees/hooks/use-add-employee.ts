import type { EmployeeFormValues, UseAddEmployee } from "../types";
import employee from "../api";

const useAddEmployee: UseAddEmployee = (opts) => {
  const onSubmit = async (inputData: EmployeeFormValues) => {
    const res = await employee.create(inputData);
    if (res.status === "success") {
      opts.onSuccess();
    }
  };

  return {
    onSubmit,
  };
};

export default useAddEmployee;
