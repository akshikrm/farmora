import { useEffect, useState } from "react";
import type { EmployeeFormValues } from "../types";
import employee from "../api";

const useGetEmployeeById = (selectedId: number | null) => {
  const [dataLoaded, setdataLoaded] = useState(false);
  const [selectedData, setSelectedData] = useState<EmployeeFormValues>({
    name: "",
    username: "",
  });

  useEffect(() => {
    const handleGetEmployeeById = async (id: number) => {
      const res = await employee.fetchById(id);
      if (res.status === "success") {
        if (res.data) {
          const { name, username } = res.data;
          setSelectedData({
            name,
            username,
          });
          setdataLoaded(true);
        }
      }
    };

    if (selectedId) {
      handleGetEmployeeById(selectedId);
    }
  }, [selectedId]);

  return { dataLoaded, selectedData };
};

export default useGetEmployeeById;
