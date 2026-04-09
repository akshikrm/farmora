import type { WorkingCostFormValues } from "../types";
import workingCost from "../api";
import { useEffect, useState } from "react";

const defaultValues: WorkingCostFormValues = {
  season_id: null,
  purpose: "",
  amount: "",
  date: "",
  payment_type: "expense",
};

const useGetWorkingCostById = (selectedId: number | null) => {
  const [selectedData, setSelectedData] =
    useState<WorkingCostFormValues>(defaultValues);

  useEffect(() => {
    const fetchWorkingCostById = async (selectedId: number) => {
      const res = await workingCost.fetchById(selectedId);
      if (res.status === "success") {
        if (res.data) {
          setSelectedData({
            season_id: res.data.season_id,
            purpose: res.data.purpose,
            amount: res.data.amount,
            date: res.data.date,
            payment_type: res.data.payment_type,
          });
        }
      }
    };
    if (selectedId) {
      fetchWorkingCostById(selectedId);
    } else {
      setSelectedData(defaultValues);
    }
  }, [selectedId]);

  return { selectedData };
};

export default useGetWorkingCostById;
