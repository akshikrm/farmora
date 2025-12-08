import seasons from "@api/seasons.api";
import type { SeasonName } from "@app-types/season.types";
import useGetAll from "@hooks/use-get-all";

const useGetSeasonNames = () => {
  const query = useGetAll<SeasonName[]>({
    queryFn: seasons.getNames,
    queryKey: "season:names",
  });

  return query;
};

export default useGetSeasonNames;
