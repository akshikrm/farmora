import employee from "@api/employees.api";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { NewEmployeeRequest } from "@app-types/employees.types";
import toast from "react-hot-toast";

const useAddEmployee = (onSuccess: () => void) => {
  const methods = useForm<NewEmployeeRequest>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      package_id: 1,
      status: 1,
      user_type: 0,
      parent_id: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async (newEmployee: NewEmployeeRequest) => await employee.create(newEmployee),
    onSuccess: (newEmployee) => {
      toast.success(`Employee ${newEmployee.username} successfully`);
      onSuccess();
    },
    onError: (error) => {
      console.error("Error creating employee:", error);
    },
  });

  const onSubmit = (data: NewEmployeeRequest) => {
    mutation.mutate(data);
  };

  return {
    methods,
    onSubmit,
  };
};

export default useAddEmployee;
