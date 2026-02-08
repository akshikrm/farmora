import seasons from "@api/seasons.api";
import type { SeasonName } from "@app-types/season.types";
import { useState, useEffect } from "react";

const useGetSeasonNameList = () => {
  const [state, setState] = useState<SeasonName[]>([]);

  useEffect(() => {
    seasons
      .getNames()
      .then((data) => setState(data))
      .catch((err) => {
        console.log(err);
        setState([]);
      });
  }, []);

  return { data: state };
};

export default useGetSeasonNameList;
