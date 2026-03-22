import batchOverview from "@api/batch-overview.api";
import type {
  BatchOverviewBatch,
  BatchOverviewExpense,
  BatchOverviewFilterRequest,
  BatchOverviewReturn,
  BatchOverviewSale,
  OverviewCalculculation,
} from "@app-types/batch-overview.types";
import { useState, useMemo } from "react";

const useBatchOverview = () => {
  const [expenses, setExpenses] = useState<BatchOverviewExpense[]>([]);
  const [sales, setSales] = useState<BatchOverviewSale[]>([]);
  const [returns, setReturns] = useState<BatchOverviewReturn[]>([]);
  const [batch, setBatch] = useState<BatchOverviewBatch | null>(null);
  const [overviewCalculations, setOverviewCalculations] =
    useState<OverviewCalculculation>({
      avg_weight: 0,
      cfcr: 0,
      fcr: 0,
      total_purchase_feeds: 0,
      total_purchase_amount: 0,
      total_returned_feeds: 0,
      total_returned_amount: 0,
      total_sale_birds: 0,
      total_sale_weight: 0,
      total_sale_amount: 0,
    });

  const onFilter = async (filter: BatchOverviewFilterRequest) => {
    const res = await batchOverview.fetchOverview(filter);
    if (res.status === "success") {
      if (res.data) {
        const { expenses, returns, sales, batch, overviewCalculations } =
          res.data;
        setOverviewCalculations(overviewCalculations);
        setExpenses(expenses);
        setSales(sales);
        setReturns(returns);
        setBatch(batch);
      }
    }
  };

  const isEmpty = useMemo(() => {
    return expenses.length === 0 && sales.length === 0 && returns.length === 0;
  }, [expenses, returns, sales]);

  return {
    expenses,
    sales,
    returns,
    batch,
    overviewCalculations,
    isEmpty,
    onFilter,
  };
};

export default useBatchOverview;
