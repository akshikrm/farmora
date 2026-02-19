import batchOverview from "@api/batch-overview.api";
import type {
  BatchOverviewBatch,
  BatchOverviewExpense,
  BatchOverviewFilterRequest,
  BatchOverviewReturn,
  BatchOverviewSale,
} from "@app-types/batch-overview.types";
import { useState, useMemo } from "react";

const useBatchOverview = () => {
  const [expenses, setExpenses] = useState<BatchOverviewExpense[]>([]);
  const [sales, setSales] = useState<BatchOverviewSale[]>([]);
  const [returns, setReturns] = useState<BatchOverviewReturn[]>([]);
  const [batch, setBatch] = useState<BatchOverviewBatch | null>(null);

  const onFilter = async (filter: BatchOverviewFilterRequest) => {
    const res = await batchOverview.fetchOverview(filter);
    if (res.status === "success") {
      if (res.data) {
        const { expenses, returns, sales, batch } = res.data;
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
    isEmpty,
    onFilter,
  };
};

export default useBatchOverview;
