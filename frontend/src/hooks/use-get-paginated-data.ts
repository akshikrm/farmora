import type { Sale } from "@app-types/sales.types";
import { useEffect, useState } from "react";

export type GenericFilter = Record<string, string>;
export type PaginatedResponse<T> = {
  page: number;
  limit: number;
  total: number;
  data: T[];
};

export type LoadingStatus = "idle" | "loading" | "success" | "failed";

const defaultState = {
  data: [],
  limit: 0,
  page: 1,
  total: 0,
};

const useGetPaginatedData = (func: Function) => {
  const [status, setStatus] = useState<LoadingStatus>("idle");
  const [paginatedData, setPaginatedData] =
    useState<PaginatedResponse<Sale>>(defaultState);
  const [error, setError] = useState(null);

  const handleFetch = async (filter?: GenericFilter) => {
    setStatus("loading");
    const res = await func(filter);
    const { status, data, error } = res;
    if (status === "success") {
      setPaginatedData(data ? data : defaultState);
      setStatus("success");
    } else {
      setStatus("failed");
      setError(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return { paginatedData, status, handleFetch, error };
};
export default useGetPaginatedData;
