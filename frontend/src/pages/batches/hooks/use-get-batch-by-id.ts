import { useEffect, useState } from "react";
import type { BatchFormValues } from "../types";
import batch from "../api";

const useGetBatchById = (selectedId: number | null) => {
  const [dataLoaded, setdataLoaded] = useState(false);
  const [selectedData, setSelectedData] = useState<BatchFormValues>({
    farm_id: "",
    name: "",
    season_id: "",
    status: "active",
  });

  useEffect(() => {
    const handleGetBatchById = async (id: number) => {
      const res = await batch.fetchById(id);
      if (res.status === "success") {
        if (res.data) {
          const { farm_id, name, season_id, status } = res.data;
          setSelectedData({
            farm_id,
            name,
            season_id,
            status,
          });
          setdataLoaded(true);
        }
      }
    };

    if (selectedId) {
      handleGetBatchById(selectedId);
    }
  }, [selectedId]);

  return { dataLoaded, selectedData };
};

export default useGetBatchById;
