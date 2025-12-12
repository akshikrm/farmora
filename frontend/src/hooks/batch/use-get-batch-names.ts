import batches from "@api/batches.api";
import type { BatchName } from "@app-types/batch.types";
import useGetAll from "@hooks/use-get-all";

const useGetBatchNames = () => {
  const query = useGetAll<BatchName[]>({
    queryFn: batches.getNames,
    queryKey: "batch:names",
  });

  return query;
};

export default useGetBatchNames;
