import farms from "@api/farms.api";
import type { FarmName } from "@app-types/farms.types";
import useGetNames from "@hooks/use-get-names";

const usetGetFarmNames = () => {
  const query = useGetNames<FarmName[]>({
    queryFn: farms.getNames,
    queryKey: "farm:names",
  });

  return query;
};

export default usetGetFarmNames;
