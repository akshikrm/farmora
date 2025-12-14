import type { ListResponse } from "@app-types/response.types";
import { useAuth } from "@store/authentication/context";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type Opts<T> = {
  queryKey: string | any[];
  queryFn: () => Promise<ListResponse<T>>;
};

const useGetAll = <T>(opts: Opts<T>) => {
  const { queryKey, queryFn } = opts;
  const userData = useAuth();
  const query = useQuery<ListResponse<T>>({
    queryKey: [queryKey],
    queryFn: async (): Promise<ListResponse<T>> => {
      return queryFn();
    },
    enabled: false,
    initialData: {
      data: [],
      limit: 0,
      page: 0,
      total: 0,
    },
  });

  useEffect(() => {
    if (userData.token) {
      query.refetch();
    }
  }, [userData.token, query]);

  return query;
};

export default useGetAll;
