import { useEffect, useState } from "react";
import type { ListResponse } from "@app-types/response.types";
import type { Purchase, PurchaseFilterRequest } from "../types";
import purchase from "../api";
import dayjs from "dayjs";

const useGetPurchases = () => {
  const [purchaseList, setPurchaseList] = useState<ListResponse<Purchase>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
  });

  const handleFetchAllPurchases = async (filter?: PurchaseFilterRequest) => {
    const res = await purchase.fetchAll(filter);
    if (res.status === "success") {
      if (res.data) {
        setPurchaseList(res.data);
      }
    }
  };

  useEffect(() => {
    handleFetchAllPurchases({
      batch_id: "",
      category_id: "",
      vendor_id: "",
      start_date: dayjs().startOf("week").toISOString(),
      end_date: dayjs().endOf("week").toISOString(),
    });
  }, []);

  return { purchaseList, handleFetchAllPurchases };
};

export default useGetPurchases;
