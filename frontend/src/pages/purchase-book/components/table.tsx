import Card from "@mui/material/Card";
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
  "Invoice Date",
  "Quantity",
  "Price Per Unit",
  "Total Amount",
  "Type",
  "Balance",
];

const PurchaseBookTable = () => {
  const [purchaseBook, setPurchaseBook] = useState<PurchaseBookItem[]>([]);

  const isEmpty = useMemo(() => {
    return purchaseBook?.length === 0;
  }, [purchaseBook]);

  const { items, credit, paid, balance } = purchaseBook;

  console.log(credit, paid, balance);
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
      <Ternary
        when={credit | paid | balance}
        then={
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 mb-4">
            <Card className="p-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold capitalize text-muted-foreground">
                  Paid
                </h3>
                <p className="text-3xl font-bold tracking-tight text-green-600">
                  ₹{paid}
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold capitalize text-muted-foreground">
                  Credit
                </h3>
                <p className="text-3xl font-bold tracking-tight text-red-600">
                  ₹{credit}
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold capitalize text-muted-foreground">
                  Balance
                </h3>
                <p
                  className={`text-3xl font-bold tracking-tight ${balance > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  ₹{balance}
                </p>
              </div>
            </Card>
          </div>
        }
      />
      <Table>
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header} content={header} />
          ))}
        </TableRow>
        {items?.map((item) => {
          return (
            <TableRow key={item.id}>
              <TableCell
                content={dayjs(item.invoice_date).format("DD-MM-YYYY")}
              />
              <TableCell content={item.quantity} />
              <TableCell content={item.price_per_unit} />
              <TableCell content={item.net_amount || "-"} />
              <TableCell content={item.type || "-"} />
              <TableCell content={item.balance || "-"} />
            </TableRow>
          );
        })}
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
