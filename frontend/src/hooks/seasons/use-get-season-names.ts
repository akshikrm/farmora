import seasons from "@api/seasons.api";
import type { SeasonName } from "@app-types/season.types";
import useGetNames from "@hooks/use-get-names";

const useGetSeasonNames = () => {
  const query = useGetNames<SeasonName[]>({
    queryFn: seasons.getNames,
    queryKey: "season:names",
  });

  return query;
};

export default useGetSeasonNames;
