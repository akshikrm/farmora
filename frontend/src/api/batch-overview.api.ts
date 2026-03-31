import type {
  BatchOverviewFilterRequest,
  BatchOverviewResponse,
} from "@app-types/batch-overview.types";
import fetcherV2, { type FetcherReturnType } from "@utils/fetcherV2";

const batchOverview = {
  fetchOverview: (
    filter: BatchOverviewFilterRequest,
  ): Promise<FetcherReturnType<BatchOverviewResponse>> => {
    const opts = {
      method: "GET" as const,
      filter: { batch_id: filter.batch_id },
    };
    return fetcherV2<BatchOverviewResponse>("overview/batch", null, opts);
  },

  closeBatch: async (batchId: number) => {
    return await fetcherV2(
      `batches/${batchId}/close`,
      JSON.stringify({
        status: "close",
      }),
      { method: "PUT" },
    );
  },
};

export default batchOverview;
