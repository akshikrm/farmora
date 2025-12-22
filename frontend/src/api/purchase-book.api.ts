import type { PurchaseBookItem } from "@app-types/purchase-book.types";
import fetcher from "@utils/fetcher";

const purchaseBook = {
  fetchAll: (filter: {
    vendor_id: number;
    start_date?: string;
    end_date?: string;
  }): Promise<PurchaseBookItem[]> => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcher("items/purchase-book", null, opts);
  },
};

export default purchaseBook;
