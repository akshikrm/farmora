import batches from "@api/batches.api";
import type { BatchName } from "@app-types/batch.types";
import useGetNames from "@hooks/use-get-names";

const useGetBatchNames = () => {
  const query = useGetNames<BatchName[]>({
    queryFn: batches.getNames,
    queryKey: "batch:names",
  });

  return query;
};

export default useGetBatchNames;
