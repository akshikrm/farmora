import salesBook from "@api/sales-book.api";
import type { SalesBookFilterRequest } from "@app-types/sales-book.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import FilterSalesBook from "./filter";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

const headers = [
  "Date",
  "Birds",
  "Weight (kg)",
  "Price",
  "Amount",
  "Type",
  "Balance",
];

const SalesBookTable = () => {
  const [filter, setFilter] = useState<SalesBookFilterRequest>({
    buyer_id: null,
    from_date: "",
    end_date: "",
  });

  const [hasFiltered, setHasFiltered] = useState(false);

  const methods = useForm<SalesBookFilterRequest>({
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
    name: keyof SalesBookFilterRequest,
    value: string | number | null
  ) => {
    setValue(name, value as any);
  };

  const salesBookQuery = useQuery({
    queryKey: ["sales-book", filter],
    queryFn: () => salesBook.fetchLedger(filter as any),
    enabled: hasFiltered && filter.buyer_id !== null,
  });

  const onFilter = async () => {
    if (values.buyer_id) {
      setFilter(values);
      setHasFiltered(true);
    }
  };

  const isEmpty = useMemo(() => {
    return salesBookQuery.data?.transactions.length === 0;
  }, [salesBookQuery.data]);

  const isFirstLoading = useMemo(() => {
    return salesBookQuery.isLoading || (isEmpty && !salesBookQuery.isFetched);
  }, [salesBookQuery.isLoading, isEmpty, salesBookQuery.isFetched]);

  const calculateTotals = () => {
    if (!salesBookQuery.data?.transactions) return null;

    const totals = salesBookQuery.data.transactions.reduce(
      (acc, item) => ({
        birds: acc.birds + (item.bird_no || 0),
        weight: acc.weight + (item.weight ? parseFloat(item.weight.toString()) : 0),
        amount: acc.amount + parseFloat(item.amount.toString()),
      }),
      { birds: 0, weight: 0, amount: 0 }
    );

    return totals;
  };

  const totals = calculateTotals();
  const ledgerData = salesBookQuery.data;

  return (
    <>
      <FilterSalesBook
        register={register}
        errors={errors}
        values={values}
        onChange={onChange}
        onFilter={onFilter}
      />
      {!hasFiltered ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">
            Please select a buyer and click "Apply Filters" to view sales ledger
          </p>
        </div>
      ) : (
        <Ternary
          when={isFirstLoading}
          then={<DataLoading />}
          otherwise={
            <>
              {ledgerData && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Buyer</p>
                      <p className="text-lg font-semibold">
                        {ledgerData.buyer?.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Opening Balance</p>
                      <p className="text-lg font-semibold">
                        ${ledgerData.opening_balance.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Closing Balance</p>
                      <p className="text-lg font-semibold text-blue-600">
                        ${ledgerData.closing_balance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Table>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeaderCell key={header} content={header} />
                  ))}
                </TableRow>
                {ledgerData?.transactions.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell
                      content={dayjs(item.created_date).format("DD-MM-YYYY")}
                    />
                    <TableCell content={item.bird_no ?? "-"} />
                    <TableCell content={item.weight ? item.weight.toFixed(2) : "-"} />
                    <TableCell content={item.price ? `$${item.price.toFixed(2)}` : "-"} />
                    <TableCell content={`$${item.amount.toFixed(2)}`} />
                    <TableCell
                      content={
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            item.type === "cash"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.type.toUpperCase()}
                        </span>
                      }
                    />
                    <TableCell
                      content={
                        <span className="font-semibold">
                          ${item.balance.toFixed(2)}
                        </span>
                      }
                    />
                  </TableRow>
                ))}
                {totals &&
                  ledgerData?.transactions &&
                  ledgerData.transactions.length > 0 && (
                    <TableRow>
                      <TableCell content={<strong>Total</strong>} />
                      <TableCell content={<strong>{totals.birds}</strong>} />
                      <TableCell
                        content={<strong>{totals.weight.toFixed(2)}</strong>}
                      />
                      <TableCell content="" />
                      <TableCell
                        content={<strong>${totals.amount.toFixed(2)}</strong>}
                      />
                      <TableCell content="" />
                      <TableCell content="" />
                    </TableRow>
                  )}
              </Table>
              <Ternary
                when={isEmpty}
                then={
                  <DataNotFound
                    title="No sales records found"
                    description="No sales found for the selected buyer and date range"
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

export default SalesBookTable;
