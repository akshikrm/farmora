import batchOverview from "@api/batch-overview.api";
import type {
  BatchOverviewBatch,
  BatchOverviewExpense,
  BatchOverviewFilterRequest,
  BatchOverviewReturn,
  BatchOverviewSale,
} from "@app-types/batch-overview.types";
import FilterBatchOverview from "./filter";
import { useState, useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import BatchInformation from "./batch-information";
import ExpenseTable from "./expense-table";
import ReturnItem from "./return-items-table";
import SalesTable from "./sales-table";
import FinancialSummaryTable from "./financial-summary-table";
import PerformanceMetrics from "./performance-metrics";

const BatchOverviewTable = () => {
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
    return;
  };

  const isEmpty = useMemo(() => {
    return expenses.length === 0 && sales.length === 0 && returns.length === 0;
  }, [expenses, returns, sales]);

  const calculateExpenseTotals = () => {
    if (!expenses) return null;
    return expenses.reduce(
      (acc, item) => ({
        quantity: acc.quantity + item.quantity,
        amount: acc.amount + item.amount,
      }),
      { quantity: 0, amount: 0 },
    );
  };

  const calculateSalesTotals = () => {
    if (!sales) return null;
    return sales.reduce(
      (acc, item) => ({
        weight: acc.weight + (item.weight || 0),
        birds: acc.birds + (item.bird_no || 0),
        amount: acc.amount + item.amount,
      }),
      { weight: 0, birds: 0, amount: 0 },
    );
  };

  const calculateReturnTotals = () => {
    if (!returns) return null;
    return returns.reduce(
      (acc, item) => ({
        quantity: acc.quantity + item.quantity,
        amount: acc.amount + item.amount,
      }),
      { quantity: 0, amount: 0 },
    );
  };

  // Calculate FCR metrics
  const calculateFCRMetrics = () => {
    if (!salesTotals || !expenseTotals) return null;

    const totalBirdWeight = salesTotals.weight; // Total bird weight (kg)
    const totalBirds = salesTotals.birds; // Total number of birds
    const totalFeedWeight = expenseTotals.quantity; // Total feed weight (assuming quantity is in kg)

    if (totalBirds === 0 || totalBirdWeight === 0) return null;

    // Average = Total bird weight / Total number of birds
    const averageWeight = totalBirdWeight / totalBirds;

    // FCR = Total Feed weight (kg) / Total bird Weight
    const fcr = totalFeedWeight / totalBirdWeight;

    // CFCR = 2 - (Avg weight * 0.25) + FCR
    const cfcr = 2 - averageWeight * 0.25 + fcr;

    // AVG COST = Total Expenses Amount / Total Bird Weight
    const avgCost = expenseTotals.amount / totalBirdWeight;

    // AVG RATE = Total Sales Amount / Total Bird Weight
    const avgRate = salesTotals.amount / totalBirdWeight;

    // AVG COST - RATE DIFFERENCE
    const costRateDifference = avgRate - avgCost;

    return {
      averageWeight: averageWeight.toFixed(3),
      fcr: fcr.toFixed(3),
      cfcr: cfcr.toFixed(3),
      avgCost: avgCost.toFixed(2),
      avgRate: avgRate.toFixed(2),
      costRateDifference: costRateDifference.toFixed(2),
    };
  };

  const expenseTotals = calculateExpenseTotals();
  const salesTotals = calculateSalesTotals();
  const returnTotals = calculateReturnTotals();
  const fcrMetrics = calculateFCRMetrics();

  return (
    <>
      <FilterBatchOverview onFilter={onFilter} />
      {isEmpty ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">
            Please select a season and batch, then click "Apply Filters" to view
            overview
          </p>
        </div>
      ) : (
        <>
          {batch && <BatchInformation batch={batch} />}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="mb-6">
              <ExpenseTable expenses={expenses} expenseTotals={expenseTotals} />

              <div className="mt-6">
                <ReturnItem returns={returns} returnTotals={returnTotals} />
              </div>

              {/* FCR Metrics Section */}
              {fcrMetrics && (
                <div className="mt-6">
                  <PerformanceMetrics fcrMetrics={fcrMetrics} />
                </div>
              )}
            </div>

            <div className="mb-6">
              <SalesTable sales={sales} salesTotals={salesTotals} />
              {expenseTotals && salesTotals && (
                <div className="mt-6">
                  <FinancialSummaryTable
                    expenseTotals={expenseTotals}
                    salesTotals={salesTotals}
                  />
                </div>
              )}
            </div>
          </div>

          <Ternary
            when={isEmpty}
            then={
              <DataNotFound
                title="No data found"
                description="No overview data found for the selected season and batch"
              />
            }
          />
        </>
      )}
    </>
  );
};

export default BatchOverviewTable;
