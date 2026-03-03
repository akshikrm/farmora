import { useEffect, useState } from "react";
import type { ItemFormValues } from "../types";
import employee from "../api";

const useGetItemById = (selectedId: number | null) => {
  const [dataLoaded, setdataLoaded] = useState(false);
  const [selectedData, setSelectedData] = useState<ItemFormValues>({
    base_price: "",
    name: "",
    type: "",
    vendor_id: "",
  });

  useEffect(() => {
    const handleGetItemById = async (id: number) => {
      const res = await employee.fetchById(id);
      if (res.status === "success") {
        if (res.data) {
          const { name, type, base_price, vendor_id } = res.data;
          setSelectedData({
            name,
            type,
            base_price,
            vendor_id,
          });
          setdataLoaded(true);
        }
      }
    };

    if (selectedId) {
      handleGetItemById(selectedId);
    }
  }, [selectedId]);

  return { dataLoaded, selectedData };
};

export default useGetItemById;
