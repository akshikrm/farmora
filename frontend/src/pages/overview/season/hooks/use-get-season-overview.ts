import { useState } from "react";
import type {
  SeasonOverviewFilterRequest,
  SeasonOverviewResponse,
} from "../types";
import seasonOverview from "../api";

const useGetSeasonOverview = () => {
  const [overview, setOverview] = useState<SeasonOverviewResponse>({
    batches: [],
    general_costs: [],
    general_sales: [],
    season: null,
    summary: null,
  });
  const onFilter = async (filter: SeasonOverviewFilterRequest) => {
    const { status, data } = await seasonOverview.fetchOverview(filter);
    if (status === "success") {
      if (data) {
        setOverview(data);
      }
    }
  };

  return { onFilter, overview };
};

export default useGetSeasonOverview;
