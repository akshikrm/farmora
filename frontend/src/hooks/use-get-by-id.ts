import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

type Opts<T> = {
  queryKey: string;
  defaultValues: T;
  queryFn: (id: number) => Promise<T>;
};

const useGetById = <T>(selectedId: number | null, opts: Opts<T>) => {
  const { defaultValues, queryFn, queryKey } = opts;

  const query = useQuery<T>({
    queryKey: [queryKey, selectedId],
    initialData: defaultValues,
    queryFn: async (): Promise<T> => queryFn(selectedId as number),
    enabled: false,
  });

  useEffect(() => {
    if (selectedId) {
      query.refetch();
    }
  }, [selectedId]);

  return query;
};

export default useGetById;
