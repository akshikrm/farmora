import type { SeasonName } from "@app-types/season.types";
import seasons from "@pages/seasons/api";
import { useState, useEffect } from "react";

type Filter = {
  status: "active" | "inactive";
};

const useGetSeasonNameList = (filter: Filter) => {
  const [state, setState] = useState<SeasonName[]>([]);

  useEffect(() => {
    seasons
      .getNames(filter)
      .then((data) => setState(data))
      .catch((err) => {
        console.log(err);
        setState([]);
      });
  }, []);

  return { data: state };
};

export default useGetSeasonNameList;
