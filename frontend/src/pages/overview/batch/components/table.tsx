import batchOverview from "@api/batch-overview.api";
import type { BatchOverviewFilterRequest } from "@app-types/batch-overview.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import FilterBatchOverview from "./filter";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const expenseHeaders = ["Date", "Purpose", "Quantity", "Price", "Amount"];
const salesHeaders = ["Date", "Vehicle No", "Weight", "Birds", "Avg Weight", "Price", "Amount"];
const returnHeaders = ["Date", "Purpose", "Quantity", "Price", "Amount"];

const BatchOverviewTable = () => {
  const [filter, setFilter] = useState<BatchOverviewFilterRequest>({
    season_id: null,
    batch_id: null,
  });

  const [hasFiltered, setHasFiltered] = useState(false);

  const methods = useForm<BatchOverviewFilterRequest>({
    defaultValues: filter,
  });

  const {
    setValue,
    register,
    formState: { errors },
    watch,
  } = methods;

  const values = watch();

  const onChange = (
    name: keyof BatchOverviewFilterRequest,
    value: number | null
  ) => {
    setValue(name, value as any);
  };

  const overviewQuery = useQuery({
    queryKey: ["batch-overview", filter],
    queryFn: () => batchOverview.fetchOverview(filter),
    enabled: hasFiltered && filter.season_id !== null && filter.batch_id !== null,
  });

  const onFilter = async () => {
    if (values.season_id && values.batch_id) {
      setFilter(values);
      setHasFiltered(true);
    }
  };

  const isEmpty = useMemo(() => {
    return (
      overviewQuery.data?.expenses.length === 0 &&
      overviewQuery.data?.sales.length === 0 &&
      overviewQuery.data?.returns.length === 0
    );
  }, [overviewQuery.data]);

  const isFirstLoading = useMemo(() => {
    return overviewQuery.isLoading || (isEmpty && !overviewQuery.isFetched);
  }, [overviewQuery.isLoading, isEmpty, overviewQuery.isFetched]);

  const calculateExpenseTotals = () => {
    if (!overviewQuery.data?.expenses) return null;
    return overviewQuery.data.expenses.reduce(
      (acc, item) => ({
        quantity: acc.quantity + item.quantity,
        amount: acc.amount + item.amount,
      }),
      { quantity: 0, amount: 0 }
    );
  };

  const calculateSalesTotals = () => {
    if (!overviewQuery.data?.sales) return null;
    return overviewQuery.data.sales.reduce(
      (acc, item) => ({
        weight: acc.weight + (item.weight || 0),
        birds: acc.birds + (item.bird_no || 0),
        amount: acc.amount + item.amount,
      }),
      { weight: 0, birds: 0, amount: 0 }
    );
  };

  const calculateReturnTotals = () => {
    if (!overviewQuery.data?.returns) return null;
    return overviewQuery.data.returns.reduce(
      (acc, item) => ({
        quantity: acc.quantity + item.quantity,
        amount: acc.amount + item.amount,
      }),
      { quantity: 0, amount: 0 }
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
    const cfcr = 2 - (averageWeight * 0.25) + fcr;

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
      <FilterBatchOverview
        register={register}
        errors={errors}
        values={values}
        onChange={onChange}
        onFilter={onFilter}
      />
      {!hasFiltered ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">
            Please select a season and batch, then click "Apply Filters" to view
            overview
          </p>
        </div>
      ) : (
        <Ternary
          when={isFirstLoading}
          then={<DataLoading />}
          otherwise={
            <>
              {overviewQuery.data?.batch && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Batch</p>
                      <p className="text-lg font-semibold">
                        {overviewQuery.data.batch.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Season</p>
                      <p className="text-lg font-semibold">
                        {overviewQuery.data.batch.season?.name || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Expenses and Sales Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Expenses Section */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Expenses</h2>
                  <Table>
                    <TableRow>
                      {expenseHeaders.map((header) => (
                        <TableHeaderCell key={header} content={header} />
                      ))}
                    </TableRow>
                    {overviewQuery.data?.expenses.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell
                          content={dayjs(item.date).format("DD-MM-YYYY")}
                        />
                        <TableCell content={item.purpose} />
                        <TableCell content={item.quantity} />
                        <TableCell content={`$${item.price.toFixed(2)}`} />
                        <TableCell content={`$${item.amount.toFixed(2)}`} />
                      </TableRow>
                    ))}
                    {expenseTotals && overviewQuery.data?.expenses && overviewQuery.data.expenses.length > 0 && (
                      <TableRow>
                        <TableCell content={<strong>Total</strong>} />
                        <TableCell content="" />
                        <TableCell
                          content={<strong>{expenseTotals.quantity}</strong>}
                        />
                        <TableCell content="" />
                        <TableCell
                          content={
                            <strong>${expenseTotals.amount.toFixed(2)}</strong>
                          }
                        />
                      </TableRow>
                    )}
                  </Table>
                  {overviewQuery.data?.expenses && overviewQuery.data.expenses.length === 0 && (
                    <div className="bg-gray-50 p-6 text-center text-gray-500">
                      No expenses found
                    </div>
                  )}

                  {/* Returned Items Section (under Expenses) */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Returned Items</h3>
                    <Table>
                      <TableRow>
                        {returnHeaders.map((header) => (
                          <TableHeaderCell key={header} content={header} />
                        ))}
                      </TableRow>
                      {overviewQuery.data?.returns.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell
                            content={dayjs(item.date).format("DD-MM-YYYY")}
                          />
                          <TableCell content={item.purpose} />
                          <TableCell content={item.quantity} />
                          <TableCell content={`$${item.price.toFixed(2)}`} />
                          <TableCell content={`$${item.amount.toFixed(2)}`} />
                        </TableRow>
                      ))}
                      {returnTotals && overviewQuery.data?.returns && overviewQuery.data.returns.length > 0 && (
                        <TableRow>
                          <TableCell content={<strong>Total</strong>} />
                          <TableCell content="" />
                          <TableCell
                            content={<strong>{returnTotals.quantity}</strong>}
                          />
                          <TableCell content="" />
                          <TableCell
                            content={
                              <strong>${returnTotals.amount.toFixed(2)}</strong>
                            }
                          />
                        </TableRow>
                      )}
                    </Table>
                    {overviewQuery.data?.returns && overviewQuery.data.returns.length === 0 && (
                      <div className="bg-gray-50 p-6 text-center text-gray-500">
                        No returned items found
                      </div>
                    )}
                  </div>

                  {/* FCR Metrics Section */}
                  {fcrMetrics && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Performance Metrics</h3>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600">Average Weight (kg/bird):</span>
                            <span className="font-semibold text-lg">{fcrMetrics.averageWeight}</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600">FCR (Feed Conversion Ratio):</span>
                            <span className="font-semibold text-lg">{fcrMetrics.fcr}</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600">CFCR (Corrected FCR):</span>
                            <span className="font-semibold text-lg text-blue-600">{fcrMetrics.cfcr}</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600">AVG COST ($/kg):</span>
                            <span className="font-semibold text-lg">${fcrMetrics.avgCost}</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600">AVG RATE ($/kg):</span>
                            <span className="font-semibold text-lg">${fcrMetrics.avgRate}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">AVG COST - RATE DIFFERENCE:</span>
                            <span className={`font-semibold text-lg ${
                              parseFloat(fcrMetrics.costRateDifference) >= 0 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              ${fcrMetrics.costRateDifference}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sales Section */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Sales</h2>
                  <Table>
                    <TableRow>
                      {salesHeaders.map((header) => (
                        <TableHeaderCell key={header} content={header} />
                      ))}
                    </TableRow>
                    {overviewQuery.data?.sales.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell
                          content={dayjs(item.date).format("DD-MM-YYYY")}
                        />
                        <TableCell content={item.vehicle_no} />
                        <TableCell
                          content={item.weight ? item.weight.toFixed(2) : "-"}
                        />
                        <TableCell content={item.bird_no ?? "-"} />
                        <TableCell
                          content={
                            item.avg_weight ? item.avg_weight.toFixed(2) : "-"
                          }
                        />
                        <TableCell
                          content={item.price ? `$${item.price.toFixed(2)}` : "-"}
                        />
                        <TableCell content={`$${item.amount.toFixed(2)}`} />
                      </TableRow>
                    ))}
                    {salesTotals && overviewQuery.data?.sales && overviewQuery.data.sales.length > 0 && (
                      <TableRow>
                        <TableCell content={<strong>Total</strong>} />
                        <TableCell content="" />
                        <TableCell
                          content={<strong>{salesTotals.weight.toFixed(2)}</strong>}
                        />
                        <TableCell content={<strong>{salesTotals.birds}</strong>} />
                        <TableCell content="" />
                        <TableCell content="" />
                        <TableCell
                          content={<strong>${salesTotals.amount.toFixed(2)}</strong>}
                        />
                      </TableRow>
                    )}
                  </Table>
                  {overviewQuery.data?.sales && overviewQuery.data.sales.length === 0 && (
                    <div className="bg-gray-50 p-6 text-center text-gray-500">
                      No sales found
                    </div>
                  )}

                  {/* Financial Summary Section */}
                  {expenseTotals && salesTotals && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Financial Summary</h3>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600">Total Expense:</span>
                            <span className="font-semibold text-lg text-red-600">
                              ${expenseTotals.amount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600">Total Sales:</span>
                            <span className="font-semibold text-lg text-blue-600">
                              ${salesTotals.amount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-semibold">Total Profit (T.P.):</span>
                            <span className={`font-bold text-xl ${
                              (salesTotals.amount - expenseTotals.amount) >= 0 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              ${(salesTotals.amount - expenseTotals.amount).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
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
          }
        />
      )}
    </>
  );
};

export default BatchOverviewTable;
