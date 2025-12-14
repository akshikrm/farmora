import { useAuth } from "@store/authentication/context";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import employee from "@api/employees.api";
import type { EmployeesListResponse } from "@app-types/employees.types";

const useGetEmployees = () => {
  const userData = useAuth();
  const query = useQuery<EmployeesListResponse>({
    queryKey: ["employees"],
    queryFn: async (): Promise<EmployeesListResponse> => await employee.fetchAll(),
    enabled: false,
    initialData: {
      data: [],
      limit: 0,
      page: 0,
      total: 0,
    },
  });

  useEffect(() => {
    if (userData.token) {
      query.refetch();
    }
  }, [userData.token, query]);

  return query;
};

export default useGetEmployees;
