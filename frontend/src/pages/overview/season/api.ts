import fetcherV2 from "@utils/fetcherV2";
import type {
  SeasonOverviewFilterRequest,
  SeasonOverviewResponse,
} from "./types";

const seasonOverview = {
  fetchOverview: (filter: SeasonOverviewFilterRequest) => {
    const opts = {
      method: "GET" as const,
      filter: { season_id: filter.season_id },
    };
    return fetcherV2<SeasonOverviewResponse>("overview/season", null, opts);
  },
  closeSeason: async (seasonId: number) => {
    return await fetcherV2(
      `seasons/${seasonId}/close`,
      JSON.stringify({
        status: "close",
      }),
      { method: "PUT" },
    );
  },
};

export default seasonOverview;
