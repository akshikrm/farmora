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
      filter: filter,
    };
    // TODO: Update endpoint path when backend is ready
    return fetcher("overview/season", null, opts);
  },
};

export default seasonOverview;
