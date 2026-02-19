import FilterBatchOverview from "./filter";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import BatchInformation from "./batch-information";
import ExpenseTable from "./expense-table";
import ReturnItem from "./return-items-table";
import SalesTable from "./sales-table";
import FinancialSummaryTable from "./financial-summary-table";
import PerformanceMetrics from "./performance-metrics";
import useBatchOverview from "@hooks/overview/use-batch-overview";
import batchOverview from "@utils/overview";
import { useMemo } from "react";

const BatchOverviewTable = () => {
  const { expenses, sales, returns, batch, onFilter, isEmpty } =
    useBatchOverview();

  const expenseTotals = useMemo(
    () => batchOverview.calculateExpenseTotals(expenses),
    [expenses],
  );
  const salesTotals = useMemo(
    () => batchOverview.calculateSalesTotals(sales),
    [sales],
  );
  const returnTotals = useMemo(
    () => batchOverview.calculateReturnTotals(returns),
    [returns],
  );
  const fcrMetrics = useMemo(
    () => batchOverview.calculateFCRMetrics(expenseTotals, salesTotals),
    [expenseTotals, salesTotals],
  );

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
