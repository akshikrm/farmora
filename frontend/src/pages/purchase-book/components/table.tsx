import purchaseBookApi from "@api/purchase-book.api";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import FilterPurchaseBook from "./filter";
import { useMemo, useState } from "react";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import dayjs from "dayjs";
import type { PurchaseBookItem } from "@app-types/purchase-book.types";

const headers = [
  "Type",
  "Invoice Number",
  "Invoice Date",
  "Quantity",
  "Price Per Unit",
  "Total Amount",
  "Discount",
  "Net Amount",
  "Balance",
];

const PurchaseBookTable = () => {
  const [purchaseBook, setPurchaseBook] = useState<PurchaseBookItem[]>([]);

  const isEmpty = useMemo(() => {
    return purchaseBook?.length === 0;
  }, [purchaseBook]);

  const calculateTotals = () => {
    if (!purchaseBook) return null;

    const totals = purchaseBook.reduce(
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
      <div className="mb-5">
        <FilterPurchaseBook
          onFilter={async (filter) => {
            const res = await purchaseBookApi.fetchAll(filter);
            if (res.status === "success") {
              if (res.data) {
                setPurchaseBook(res.data);
                return;
              }
            }
            setPurchaseBook([]);
          }}
        />
      </div>
      <Table>
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header} content={header} />
          ))}
        </TableRow>
        {purchaseBook?.map((item) => (
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
            <TableCell content={item.balance || "-"} />
          </TableRow>
        ))}
        {totals && purchaseBook && purchaseBook.length > 0 && (
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
  );
};

export default PurchaseBookTable;
