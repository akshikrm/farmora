import { useEffect, useState } from "react";
import type { ItemListResponse } from "../types";
import items from "../api";

const useGetItems = () => {
  const [itemsList, setItemsList] = useState<ItemListResponse>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
  });

  const handleFetchAllItems = async () => {
    const res = await items.fetchAll();
    if (res.status === "success") {
      if (res.data) {
        setItemsList(res.data);
      }
    }
  };
  useEffect(() => {
    handleFetchAllItems();
  }, []);

  return { itemsList, handleFetchAllItems };
};

export default useGetItems;
