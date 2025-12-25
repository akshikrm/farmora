import integrationBook from "@api/integration-book.api";
import type { IntegrationBookFilterRequest } from "@app-types/integration-book.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import FilterIntegrationBook from "./filter";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

const headers = [
  "Type",
  "Invoice Number",
  "Invoice Date",
  "Quantity",
  "Price Per Unit",
  "Total Amount",
  "Discount",
  "Net Amount",
];

const IntegrationBookTable = () => {
  const [filter, setFilter] = useState<IntegrationBookFilterRequest>({
    farm_id: null,
    start_date: "",
    end_date: "",
  });

  const [hasFiltered, setHasFiltered] = useState(false);

  const methods = useForm<IntegrationBookFilterRequest>({
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
    name: keyof IntegrationBookFilterRequest,
    value: string | number | null,
  ) => {
    setValue(name, value as any);
  };

  const integrationBookQuery = useQuery({
    queryKey: ["integration-book", filter],
    queryFn: () => integrationBook.fetchAll(filter as any),
    enabled: hasFiltered && filter.farm_id !== null,
  });

  const onFilter = async () => {
    if (values.farm_id) {
      setFilter(values);
      setHasFiltered(true);
    }
  };

  const isEmpty = useMemo(() => {
    return (
      integrationBookQuery.data?.credit_items?.length === 0 &&
      integrationBookQuery.data?.paid_items?.length === 0
    );
  }, [integrationBookQuery.data]);

  const isFirstLoading = useMemo(() => {
    return (
      integrationBookQuery.isLoading ||
      (isEmpty && !integrationBookQuery.isFetched)
    );
  }, [integrationBookQuery.isLoading, isEmpty, integrationBookQuery.isFetched]);

  const calculateTotals = (items: any[]) => {
    if (!items || items.length === 0) return null;

    const totals = items.reduce(
      (acc, item) => ({
        quantity:
          parseFloat(acc.quantity.toString()) +
          parseFloat(item.quantity.toString()),
        totalPrice:
          parseFloat(acc.totalPrice.toString()) +
          parseFloat(item.total_price.toString()),
        discount:
          parseFloat(acc.discount.toString()) +
          parseFloat(item.discount_price.toString()),
        netAmount:
          parseFloat(acc.netAmount.toString()) +
          (parseFloat(item.net_amount.toString()) || 0),
      }),
      { quantity: 0, totalPrice: 0, discount: 0, netAmount: 0 },
    );

    return totals;
  };

  const creditTotals = calculateTotals(
    integrationBookQuery.data?.credit_items || [],
  );
  const paidTotals = calculateTotals(
    integrationBookQuery.data?.paid_items || [],
  );

  const balanceTotals = useMemo(() => {
    return paidTotals.netAmount - creditTotals.netAmount;
  }, [creditTotals, paidTotals]);

  const renderTable = (items: any[], title: string, totals: any) => (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      <Table>
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header} content={header} />
          ))}
        </TableRow>
        {items?.map((item) => (
          <TableRow key={item.id}>
            <TableCell content={item.category?.name || "-"} />
            <TableCell content={item.invoice_number} />
            <TableCell
              content={dayjs(item.invoice_date).format("DD-MM-YYYY")}
            />
            <TableCell content={item.quantity} />
            <TableCell content={item.price_per_unit} />
            <TableCell content={item.total_price} />
            <TableCell content={item.discount_price} />
            <TableCell content={item.net_amount || "-"} />
          </TableRow>
        ))}
        {totals && items && items.length > 0 && (
          <TableRow>
            <TableCell content={<strong>Total</strong>} />
            <TableCell content="" />
            <TableCell content="" />
            <TableCell content={<strong>{totals.quantity}</strong>} />
            <TableCell content="" />
            <TableCell content={<strong>{totals.totalPrice}</strong>} />
            <TableCell content={<strong>{totals.discount}</strong>} />
            <TableCell content={<strong>{totals.netAmount}</strong>} />
          </TableRow>
        )}
      </Table>
      {items?.length === 0 && (
        <DataNotFound
          title={`No ${title.toLowerCase()} records found`}
          description={`No ${title.toLowerCase()} items found for the selected farm and date range`}
        />
      )}
    </div>
  );

  return (
    <>
      <FilterIntegrationBook
        register={register}
        errors={errors}
        values={values}
        onChange={onChange}
        onFilter={onFilter}
      />
      {!hasFiltered ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">
            Please select a farm and click "Apply Filters" to view integration
            book
          </p>
        </div>
      ) : (
        <Ternary
          when={isFirstLoading}
          then={<DataLoading />}
          otherwise={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderTable(
                integrationBookQuery.data?.paid_items || [],
                "Paid Items",
                paidTotals,
              )}
              {renderTable(
                integrationBookQuery.data?.credit_items || [],
                "Credit Items",
                creditTotals,
              )}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h5 className="text-xl font-semibold text-gray-800">
                  Balance: {balanceTotals !== null ? balanceTotals : "-"}
                </h5>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default IntegrationBookTable;
