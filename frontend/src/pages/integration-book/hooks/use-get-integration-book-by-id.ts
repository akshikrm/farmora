import type { IntegrationBookFormValues } from "../types";
import integrationBook from "../api";
import { useEffect, useState } from "react";

const defaultValues: IntegrationBookFormValues = {
  farm_id: null,
  amount: "",
  date: "",
  payment_type: "credit",
};

const useGetIntegrationBookById = (selectedId: number | null) => {
  const [selectedData, setSelectedData] =
    useState<IntegrationBookFormValues>(defaultValues);

  useEffect(() => {
    const fetchIntegrationBookById = async (selectedId: number) => {
      const res = await integrationBook.fetchById(selectedId);
      if (res.status === "success") {
        if (res.data) {
          setSelectedData({
            farm_id: res.data.farm_id,
            amount: res.data.amount,
            date: res.data.date,
            payment_type: res.data.payment_type,
          });
        }
      }
    };
    if (selectedId) {
      fetchIntegrationBookById(selectedId);
    } else {
      setSelectedData(defaultValues);
    }
  }, [selectedId]);

  return { selectedData };
};

export default useGetIntegrationBookById;
