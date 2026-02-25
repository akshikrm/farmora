import type { GenericFilter } from "@utils/serialie-filter";
import { useEffect, useState } from "react";

export type PaginatedResponse<T> = {
  page: number;
  limit: number;
  total: number;
  data: T;
};

export type LoadingStatus = "idle" | "loading" | "success" | "failed";

const defaultState = {
  data: [],
  limit: 0,
  page: 1,
  total: 0,
};

export type UseGetPaginatedData<T> = {
  paginatedData: PaginatedResponse<T>;
  status: LoadingStatus;
  handleFetch: (filter?: GenericFilter) => void;
};

const useGetPaginatedData = <T>(func: Function): UseGetPaginatedData<T> => {
  const [status, setStatus] = useState<LoadingStatus>("idle");
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse<T>>(
    defaultState as PaginatedResponse<T>,
  );

  const handleFetch = async (filter?: GenericFilter) => {
    setStatus("loading");
    const res = await func(filter);
    const { status, data } = res;
    if (status === "success") {
      setPaginatedData(data ? data : defaultState);
      setStatus("success");
    } else {
      setStatus("failed");
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return { paginatedData, status, handleFetch };
};

export default useGetPaginatedData;
