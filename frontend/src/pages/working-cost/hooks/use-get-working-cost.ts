import { useCallback, useRef, useState } from "react";
import type {
  WorkingCostListResponse,
  WorkingCostFilterRequest,
} from "../types";
import workingCost from "../api";

const defaultValues: WorkingCostFilterRequest = {
  season_id: null,
  start_date: "",
  end_date: "",
};

const useGetWorkingCost = () => {
  const currentFilter = useRef<WorkingCostFilterRequest>(defaultValues);
  const [workingCostList, setWorkingCostList] =
    useState<WorkingCostListResponse>({
      income: [],
      expense: [],
    });

  const handleFetchAllWorkingCost = useCallback(
    async (filter?: WorkingCostFilterRequest) => {
      currentFilter.current = filter ? filter : currentFilter.current;

      const res = await workingCost.fetchAll(
        filter ? filter : currentFilter.current,
      );

      if (res.status === "success") {
        if (res.data) {
          setWorkingCostList(res.data);
        }
      }
    },
    [],
  );

  return { workingCostList, handleFetchAllWorkingCost };
};

export default useGetWorkingCost;
