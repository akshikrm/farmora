import type { FarmFormValues } from "../types";
import farms from "../api";
import { useEffect, useState } from "react";

const defaultValues = {
  name: "",
  place: "",
  capacity: "",
};

const useGetFarmById = (selectedId: number | null) => {
  const [selectedData, setSelectedData] =
    useState<FarmFormValues>(defaultValues);

  useEffect(() => {
    const fetchFarmById = async (selectedId: number) => {
      const res = await farms.fetchById(selectedId);
      if (res.status === "success") {
        if (res.data) {
          setSelectedData({
            name: res.data.name,
            capacity: res.data.capacity,
            place: res.data.place,
          });
        }
      }
    };
    if (selectedId) {
      fetchFarmById(selectedId);
    } else {
      setSelectedData(defaultValues);
    }
  }, [selectedId]);

  return { selectedData };
};

export default useGetFarmById;
