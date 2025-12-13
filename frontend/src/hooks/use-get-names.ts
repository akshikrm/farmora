import { useAuth } from "@store/authentication/context";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type Opts<T> = {
  queryKey: string;
  queryFn: () => Promise<T>;
};

const useGetNames = <T>(opts: Opts<T>) => {
  const { queryKey, queryFn } = opts;
  const userData = useAuth();
  const query = useQuery<T>({
    queryKey: [queryKey],
    queryFn: async (): Promise<T> => queryFn(),
    enabled: false,
    initialData: [] as T,
  });

  useEffect(() => {
    if (userData.token) {
      query.refetch();
    }
  }, [userData.token, query]);

  return query;
};

export default useGetNames;
