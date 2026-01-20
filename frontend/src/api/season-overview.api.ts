import type {
  SeasonOverviewFilterRequest,
  SeasonOverviewResponse,
} from "@app-types/season-overview.types";
import fetcher from "@utils/fetcher";

const seasonOverview = {
  fetchOverview: (
    filter: SeasonOverviewFilterRequest
  ): Promise<SeasonOverviewResponse> => {
    const opts = {
      method: "GET" as const,
      filter: { season_id: filter.season_id },
    };
    return fetcher("overview/season", null, opts);
  },
};

export default seasonOverview;
