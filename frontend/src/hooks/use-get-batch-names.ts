import batches from "@api/batches.api";
import type { SeasonName } from "@app-types/season.types";
import { useState, useEffect } from "react";

const useGetBatchNameList = () => {
  const [state, setState] = useState<SeasonName[]>([]);

  useEffect(() => {
    batches
      .getNames()
      .then((data) => setState(data))
      .catch((err) => {
        console.log(err);
        setState([]);
      });
  }, []);

  return { data: state };
};

export default useGetBatchNameList;
