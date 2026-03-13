import { useEffect, useState } from "react";
import type { BatchListResponse } from "../types";
import batch from "../api";

const useGetBatches = () => {
  const [batchList, setBatchesList] = useState<BatchListResponse>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
  });

  const handleFetchAllBatches = async () => {
    const res = await batch.fetchAll();
    if (res.status === "success") {
      if (res.data) {
        setBatchesList(res.data);
      }
    }
  };
  useEffect(() => {
    handleFetchAllBatches();
  }, []);

  return { batchList, handleFetchAllBatches };
};

export default useGetBatches;
