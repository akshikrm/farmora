import seasonOverview from "@api/season-overview.api";
import type { SeasonOverviewFilterRequest } from "@app-types/season-overview.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import FilterSeasonOverview from "./filter";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const batchHeaders = [
  "Batch Name",
  "Close Date",
  "Avg Weight",
  "FCR",
  "CFSR",
  "Avg Cost",
  "Avg Rate",
  "Profit/Loss %",
  "Profit",
];

const generalHeaders = ["Date", "Purpose", "Amount"];

const SeasonOverviewTable = () => {
  const [filter, setFilter] = useState<SeasonOverviewFilterRequest>({
    season_id: null,
  });

  const [hasFiltered, setHasFiltered] = useState(false);

  const methods = useForm<SeasonOverviewFilterRequest>({
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
    name: keyof SeasonOverviewFilterRequest,
    value: number | null
  ) => {
    setValue(name, value as never);
  };

  const overviewQuery = useQuery({
    queryKey: ["season-overview", filter],
    queryFn: () => seasonOverview.fetchOverview(filter),
    enabled: hasFiltered && filter.season_id !== null,
  });

  const onFilter = async () => {
    if (values.season_id) {
      setFilter(values);
      setHasFiltered(true);
    }
  };

  const isEmpty = useMemo(() => {
    return (
      overviewQuery.data?.batches.length === 0 &&
      overviewQuery.data?.general_costs.length === 0 &&
      overviewQuery.data?.general_sales.length === 0
    );
  }, [overviewQuery.data]);

  const isFirstLoading = useMemo(() => {
    return overviewQuery.isLoading || (isEmpty && !overviewQuery.isFetched);
  }, [overviewQuery.isLoading, isEmpty, overviewQuery.isFetched]);

  const calculateBatchTotals = () => {
    if (!overviewQuery.data?.batches || overviewQuery.data.batches.length === 0)
      return null;
    const batches = overviewQuery.data.batches;
    const totalProfit = batches.reduce((sum, b) => sum + b.profit, 0);
    const avgFCR =
      batches.reduce((sum, b) => sum + b.fcr, 0) / batches.length;
    const avgCFSR =
      batches.reduce((sum, b) => sum + b.cfsr, 0) / batches.length;
    const avgCost =
      batches.reduce((sum, b) => sum + b.avg_cost, 0) / batches.length;
    const avgRate =
      batches.reduce((sum, b) => sum + b.avg_rate, 0) / batches.length;
    const avgWeight =
      batches.reduce((sum, b) => sum + b.avg_weight, 0) / batches.length;
    const avgProfitLossPercentage =
      batches.reduce((sum, b) => sum + b.profit_loss_percentage, 0) /
      batches.length;

    return {
      totalProfit,
      avgFCR,
      avgCFSR,
      avgCost,
      avgRate,
      avgWeight,
      avgProfitLossPercentage,
    };
  };

  const batchTotals = calculateBatchTotals();

  return (
    <>
      <FilterSeasonOverview
        register={register}
        errors={errors}
        values={values}
        onChange={onChange}
        onFilter={onFilter}
      />
      {!hasFiltered ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">
            Please select a season and click "Apply Filters" to view overview
          </p>
        </div>
      ) : (
        <Ternary
          when={isFirstLoading}
          then={<DataLoading />}
          otherwise={
            <>
              {overviewQuery.data?.season && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Season</p>
                      <p className="text-lg font-semibold">
                        {overviewQuery.data.season.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Batches</p>
                      <p className="text-lg font-semibold">
                        {overviewQuery.data.batches.length}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Batch Overview Table */}
              {overviewQuery.data?.batches &&
                overviewQuery.data.batches.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">
                      Batch Overview
                    </h2>
                    <Table>
                      <TableRow>
                        {batchHeaders.map((header) => (
                          <TableHeaderCell key={header} content={header} />
                        ))}
                      </TableRow>
                      {overviewQuery.data?.batches.map((item) => (
                        <TableRow key={item.batch_id}>
                          <TableCell content={item.batch_name} />
                          <TableCell
                            content={
                              item.close_date
                                ? dayjs(item.close_date).format("DD-MM-YYYY")
                                : "-"
                            }
                          />
                          <TableCell
                            content={`${item.avg_weight.toFixed(2)} kg`}
                          />
                          <TableCell content={item.fcr.toFixed(3)} />
                          <TableCell content={`$${item.cfsr.toFixed(2)}`} />
                          <TableCell content={`$${item.avg_cost.toFixed(2)}`} />
                          <TableCell content={`$${item.avg_rate.toFixed(2)}`} />
                          <TableCell
                            content={
                              <span
                                className={
                                  item.profit_loss_percentage >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {item.profit_loss_percentage.toFixed(2)}%
                              </span>
                            }
                          />
                          <TableCell
                            content={
                              <span
                                className={`font-semibold ${
                                  item.profit >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                ${item.profit.toFixed(2)}
                              </span>
                            }
                          />
                        </TableRow>
                      ))}
                      {batchTotals && (
                        <TableRow>
                          <TableCell
                            content={<strong>Average / Total</strong>}
                          />
                          <TableCell content="" />
                          <TableCell
                            content={
                              <strong>
                                {batchTotals.avgWeight.toFixed(2)} kg
                              </strong>
                            }
                          />
                          <TableCell
                            content={
                              <strong>{batchTotals.avgFCR.toFixed(3)}</strong>
                            }
                          />
                          <TableCell
                            content={
                              <strong>${batchTotals.avgCFSR.toFixed(2)}</strong>
                            }
                          />
                          <TableCell
                            content={
                              <strong>${batchTotals.avgCost.toFixed(2)}</strong>
                            }
                          />
                          <TableCell
                            content={
                              <strong>${batchTotals.avgRate.toFixed(2)}</strong>
                            }
                          />
                          <TableCell
                            content={
                              <strong
                                className={
                                  batchTotals.avgProfitLossPercentage >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {batchTotals.avgProfitLossPercentage.toFixed(2)}
                                %
                              </strong>
                            }
                          />
                          <TableCell
                            content={
                              <strong
                                className={
                                  batchTotals.totalProfit >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                ${batchTotals.totalProfit.toFixed(2)}
                              </strong>
                            }
                          />
                        </TableRow>
                      )}
                    </Table>
                  </div>
                )}

              {/* General Cost and General Sales - Side by Side */}
              <div className="flex gap-6 mb-6">
                {/* General Cost */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3">General Cost</h2>
                  <Table>
                    <TableRow>
                      {generalHeaders.map((header) => (
                        <TableHeaderCell key={header} content={header} />
                      ))}
                    </TableRow>
                    {overviewQuery.data?.general_costs.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell
                          content={dayjs(item.date).format("DD-MM-YYYY")}
                        />
                        <TableCell content={item.purpose} />
                        <TableCell
                          content={
                            <span className="text-red-600">
                              ${item.amount.toFixed(2)}
                            </span>
                          }
                        />
                      </TableRow>
                    ))}
                    {overviewQuery.data?.general_costs &&
                      overviewQuery.data.general_costs.length > 0 && (
                        <TableRow>
                          <TableCell content={<strong>Total</strong>} />
                          <TableCell content="" />
                          <TableCell
                            content={
                              <strong className="text-red-600">
                                $
                                {overviewQuery.data.summary.total_general_cost.toFixed(
                                  2
                                )}
                              </strong>
                            }
                          />
                        </TableRow>
                      )}
                  </Table>
                  {overviewQuery.data?.general_costs.length === 0 && (
                    <div className="bg-gray-50 p-6 text-center text-gray-500">
                      No general costs found
                    </div>
                  )}
                </div>

                {/* General Sales */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3">General Sales</h2>
                  <Table>
                    <TableRow>
                      {generalHeaders.map((header) => (
                        <TableHeaderCell
                          key={`sales-${header}`}
                          content={header}
                        />
                      ))}
                    </TableRow>
                    {overviewQuery.data?.general_sales.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell
                          content={dayjs(item.date).format("DD-MM-YYYY")}
                        />
                        <TableCell content={item.purpose} />
                        <TableCell
                          content={
                            <span className="text-green-600">
                              ${item.amount.toFixed(2)}
                            </span>
                          }
                        />
                      </TableRow>
                    ))}
                    {overviewQuery.data?.general_sales &&
                      overviewQuery.data.general_sales.length > 0 && (
                        <TableRow>
                          <TableCell content={<strong>Total</strong>} />
                          <TableCell content="" />
                          <TableCell
                            content={
                              <strong className="text-green-600">
                                $
                                {overviewQuery.data.summary.total_general_sales.toFixed(
                                  2
                                )}
                              </strong>
                            }
                          />
                        </TableRow>
                      )}
                  </Table>
                  {overviewQuery.data?.general_sales.length === 0 && (
                    <div className="bg-gray-50 p-6 text-center text-gray-500">
                      No general sales found
                    </div>
                  )}
                </div>
              </div>

              {/* Investor Profit Summary */}
              {overviewQuery.data?.summary && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Investor Profit Summary
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Batch Profit</p>
                      <p
                        className={`text-2xl font-bold ${
                          overviewQuery.data.summary.total_batch_profit >= 0
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                      >
                        ${overviewQuery.data.summary.total_batch_profit.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total General Cost</p>
                      <p className="text-2xl font-bold text-red-600">
                        -${overviewQuery.data.summary.total_general_cost.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total General Sales</p>
                      <p className="text-2xl font-bold text-green-600">
                        +${overviewQuery.data.summary.total_general_sales.toFixed(2)}
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-lg ${
                        overviewQuery.data.summary.investor_profit >= 0
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      <p className="text-sm text-gray-600">Investor Profit</p>
                      <p
                        className={`text-2xl font-bold ${
                          overviewQuery.data.summary.investor_profit >= 0
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        ${overviewQuery.data.summary.investor_profit.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Ternary
                when={isEmpty}
                then={
                  <DataNotFound
                    title="No data found"
                    description="No overview data found for the selected season"
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

export default SeasonOverviewTable;
