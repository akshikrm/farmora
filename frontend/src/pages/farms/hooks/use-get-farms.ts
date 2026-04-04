import { useCallback, useEffect, useState } from "react";
import farms from "../api";
import type { FarmsListResponse } from "../types";

const useGetFarms = () => {
  const [farmList, setFarmList] = useState<FarmsListResponse>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
  });

  const handleGetFarms = useCallback(async () => {
    const res = await farms.fetchAll();
    if (res.status === "success") {
      if (res.data) {
        setFarmList(res.data);
      }
    }
  }, []);

  useEffect(() => {
    handleGetFarms();
  }, [handleGetFarms]);

  return { farmList, handleGetFarms };
};

export default useGetFarms;
