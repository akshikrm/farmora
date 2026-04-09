import useGetNames from "@hooks/use-get-names";
import farms from "@pages/farms/api";
import type { FarmName } from "@pages/farms/types";

const useGetFarmNames = () => {
  const query = useGetNames<FarmName[]>({
    queryFn: farms.getNames,
    queryKey: "farm:names",
  });

  return query;
};

export default useGetFarmNames;
