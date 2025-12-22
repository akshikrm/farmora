import purchaseBook from "@api/purchase-book.api";
import type { PurchaseBookFilterRequest } from "@app-types/purchase-book.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import FilterPurchaseBook from "./filter";
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

const PurchaseBookTable = () => {
  const [filter, setFilter] = useState<PurchaseBookFilterRequest>({
    vendor_id: null,
    start_date: "",
    end_date: "",
  });

  const [hasFiltered, setHasFiltered] = useState(false);

  const methods = useForm<PurchaseBookFilterRequest>({
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
    name: keyof PurchaseBookFilterRequest,
    value: string | number | null,
  ) => {
    setValue(name, value as any);
  };

  const purchaseBookQuery = useQuery({
    queryKey: ["purchase-book", filter],
    queryFn: () => purchaseBook.fetchAll(filter as any),
    enabled: hasFiltered && filter.vendor_id !== null,
  });

  const onFilter = async () => {
    if (values.vendor_id) {
      setFilter(values);
      setHasFiltered(true);
    }
  };

  const isEmpty = useMemo(() => {
    return purchaseBookQuery.data?.length === 0;
  }, [purchaseBookQuery.data]);

  const isFirstLoading = useMemo(() => {
    return (
      purchaseBookQuery.isLoading || (isEmpty && !purchaseBookQuery.isFetched)
    );
  }, [purchaseBookQuery.isLoading, isEmpty, purchaseBookQuery.isFetched]);

  const calculateTotals = () => {
    if (!purchaseBookQuery.data) return null;

    const totals = purchaseBookQuery.data.reduce(
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

  const totals = calculateTotals();

  return (
    <>
      <FilterPurchaseBook
        register={register}
        errors={errors}
        values={values}
        onChange={onChange}
        onFilter={onFilter}
      />
      {!hasFiltered ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">
            Please select a vendor and click "Apply Filters" to view purchase
            book
          </p>
        </div>
      ) : (
        <Ternary
          when={isFirstLoading}
          then={<DataLoading />}
          otherwise={
            <>
              <Table>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeaderCell key={header} content={header} />
                  ))}
                </TableRow>
                {purchaseBookQuery.data?.map((item) => (
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
                {totals &&
                  purchaseBookQuery.data &&
                  purchaseBookQuery.data.length > 0 && (
                    <TableRow>
                      <TableCell content={<strong>Total</strong>} />
                      <TableCell content="" />
                      <TableCell content="" />
                      <TableCell content={<strong>{totals.quantity}</strong>} />
                      <TableCell content="" />
                      <TableCell
                        content={<strong>{totals.totalPrice}</strong>}
                      />
                      <TableCell content={<strong>{totals.discount}</strong>} />
                      <TableCell
                        content={<strong>{totals.netAmount}</strong>}
                      />
                    </TableRow>
                  )}
              </Table>
              <Ternary
                when={isEmpty}
                then={
                  <DataNotFound
                    title="No purchase records found"
                    description="No purchases found for the selected vendor and date range"
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

export default PurchaseBookTable;
