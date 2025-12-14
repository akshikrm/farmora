import farms from "@api/farms.api";
import type { FarmName } from "@app-types/farms.types";
import useGetAll from "@hooks/use-get-all";

const usetGetFarmNames = () => {
  const query = useGetAll<FarmName[]>({
    queryFn: farms.getNames,
    queryKey: "farm:names",
  });

  return query;
};

export default usetGetFarmNames;
