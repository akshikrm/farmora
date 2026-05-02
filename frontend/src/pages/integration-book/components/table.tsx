import type { IntegrationBookListResponse } from "../types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import { useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import dayjs from "dayjs";
import Card from "@mui/material/Card";

const headers = ["Date", "Amount", "Payment Type", "Status"];

type Props = {
  data: IntegrationBookListResponse;
};

const IntegrationBookTable = ({ data }: Props) => {
  const paidItems = useMemo(() => data?.paid_items || [], [data?.paid_items]);
  const creditItems = useMemo(
    () => data?.credit_items || [],
    [data?.credit_items],
  );

  const isEmpty = useMemo(() => {
    return paidItems.length === 0 && creditItems.length === 0;
  }, [paidItems, creditItems]);

  const calculateTotals = (items: { amount: number }[]) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((acc, item) => {
      return acc + (parseFloat(item.amount.toString()) || 0);
    }, 0);
  };

  const creditTotals = calculateTotals(creditItems);
  const paidTotals = calculateTotals(paidItems);
  const balanceTotals = paidTotals - creditTotals;

  const renderTable = (
    items: {
      id: number;
      date: string;
      amount: number;
      payment_type: string;
      status: string;
    }[],
    title: string,
  ) => (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      <Card className="overflow-hidden">
        <Table>
          <TableRow>
            {headers.map((header) => (
              <TableHeaderCell key={header} content={header} />
            ))}
          </TableRow>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell content={dayjs(item.date).format("DD-MM-YYYY")} />
              <TableCell content={item.amount || "-"} />
              <TableCell content={item.payment_type} />
              <TableCell content={item.status} />
            </TableRow>
          ))}
        </Table>
        {items.length === 0 && (
          <DataNotFound
            title={`No ${title.toLowerCase()} records found`}
            description={`No ${title.toLowerCase()} items found`}
          />
        )}
      </Card>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {renderTable(paidItems, "Paid")}
        {renderTable(creditItems, "Credit")}
      </div>
      <Card className="p-6">
        <TotalItem label="Total Paid Amount" value={paidTotals} />
        <TotalItem label="Total Credit Amount" value={creditTotals} />
        <TotalItem label="Balance" value={balanceTotals} />
      </Card>
      <Ternary
        when={isEmpty}
        then={
          <DataNotFound
            title="No integration book records found"
            description="Get started by adding a new entry"
          />
        }
      />
    </>
  );
};

const TotalItem = ({ label, value }: { label: string; value: number }) => {
  return (
    <h5 className="text-md font-semibold text-gray-800 mb-2">
      {label}: {value}/-
    </h5>
  );
};

export default IntegrationBookTable;
