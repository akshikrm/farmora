import type { WorkingCostListResponse } from "../types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import { EditIcon } from "lucide-react";
import { useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import dayjs from "dayjs";
import Card from "@mui/material/Card";

const headers = ["Date", "Purpose", "Amount", "Payment Type", "Status", "Action"];

type Props = {
  data: WorkingCostListResponse;
  onEdit: (selectedId: number) => void;
};

const WorkingCostTable = ({ data, onEdit }: Props) => {
  const incomeItems = data?.income || [];
  const expenseItems = data?.expense || [];

  const isEmpty = useMemo(() => {
    return incomeItems.length === 0 && expenseItems.length === 0;
  }, [incomeItems, expenseItems]);

  const calculateTotal = (items: { amount: number }[]) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((acc, item) => {
      return acc + (parseFloat(item.amount.toString()) || 0);
    }, 0);
  };

  const incomeTotal = calculateTotal(incomeItems);
  const expenseTotal = calculateTotal(expenseItems);
  const balanceTotal = incomeTotal - expenseTotal;

  const renderTable = (
    items: {
      id: number;
      date: string;
      purpose: string;
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
              <TableCell content={item.purpose} />
              <TableCell content={item.amount || "-"} />
              <TableCell content={item.payment_type} />
              <TableCell content={item.status} />
              <TableCell
                content={
                  <EditIcon
                    className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={() => onEdit(item.id)}
                  />
                }
              />
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
        {renderTable(incomeItems, "Income")}
        {renderTable(expenseItems, "Expense")}
      </div>
      <Card className="p-6">
        <TotalItem label="Total Income Amount" value={incomeTotal} />
        <TotalItem label="Total Expense Amount" value={expenseTotal} />
        <TotalItem label="Balance" value={balanceTotal} />
      </Card>
      <Ternary
        when={isEmpty}
        then={
          <DataNotFound
            title="No working cost records found"
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
      {label}: {value.toFixed(2)}/-
    </h5>
  );
};

export default WorkingCostTable;
