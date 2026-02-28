import { useEffect, useState } from "react";
import type { EmployeesListResponse } from "../types";
import employee from "../api";

const useGetEmployees = () => {
  const [employeeList, setEmployeeList] = useState<EmployeesListResponse>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
  });

  const handleFetchAllEmployees = async () => {
    const res = await employee.fetchAll();
    if (res.status === "success") {
      if (res.data) {
        setEmployeeList(res.data);
      }
    }
  };
  useEffect(() => {
    handleFetchAllEmployees();
  }, []);

  return { employeeList, handleFetchAllEmployees };
};

export default useGetEmployees;
