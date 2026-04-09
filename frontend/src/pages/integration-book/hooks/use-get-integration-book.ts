import { useCallback, useRef, useState } from "react";
import type {
  IntegrationBookFilterRequest,
  IntegrationBookListResponse,
} from "../types";
import integrationBook from "../api";

const defaultValues: IntegrationBookFilterRequest = {
  farm_id: null,
  start_date: "",
  end_date: "",
};
const useGetIntegrationBook = () => {
  const currentFilter = useRef<IntegrationBookFilterRequest>(defaultValues);
  const [integrationBookList, setIntegrationBookList] =
    useState<IntegrationBookListResponse>({
      credit_items: [],
      paid_items: [],
    });

  const handleFetchAllIntegrationBook = useCallback(
    async (filter?: IntegrationBookFilterRequest) => {
      currentFilter.current = filter ? filter : currentFilter.current;
      if (!currentFilter.current?.farm_id) {
        return;
      }

      const res = await integrationBook.fetchAll(
        filter ? filter : currentFilter.current,
      );

      if (res.status === "success") {
        if (res.data) {
          setIntegrationBookList(res.data);
        }
      }
    },
    [],
  );

  return { integrationBookList, handleFetchAllIntegrationBook };
};

export default useGetIntegrationBook;
