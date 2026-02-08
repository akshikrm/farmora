import type {
  SalesBookLedger,
  NewSalesBookEntryRequest,
  SalesBookFilterRequest,
  SalesBookLedgerResponse,
} from "@app-types/sales-book.types";
import fetcher from "@utils/fetcher";
import fetcherV2, { type FetcherReturnType } from "@utils/fetcherV2";

const salesBook = {
  fetchLedger: async (
    filter: SalesBookFilterRequest,
  ): Promise<FetcherReturnType<SalesBookLedger>> => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    const res = await fetcherV2<SalesBookLedgerResponse>(
      "sales/ledger",
      null,
      opts,
    );
    const { data, status, error } = res;
    const response: FetcherReturnType<SalesBookLedger> = {
      status,
      data: {
        transactions: data?.transactions || [],
        buyer: data?.buyer?.name || "",
        closing_balance: data?.closing_balance || "0",
        opening_balance: data?.opening_balance || "0",
      },
    };

    if (error) {
      response.error = error;
    }

    return response;
  },
  create: async (payload: NewSalesBookEntryRequest) =>
    await fetcher("sales/ledger", JSON.stringify(payload), { method: "POST" }),
};

export default salesBook;
