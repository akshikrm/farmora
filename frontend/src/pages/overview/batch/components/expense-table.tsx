import type { BatchOverviewExpense } from "@app-types/batch-overview.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import dayjs from "dayjs";

const expenseHeaders = ["Date", "Purpose", "Quantity", "Price", "Amount"];

type Props = {
  expenses: BatchOverviewExpense[];
  expenseTotals: {
    quantity: number;
    amount: number;
  } | null;
};

const ExpenseTable = (props: Props) => {
  const { expenses, expenseTotals } = props;
  return (
    <>
      <h2 className="text-xl font-semibold mb-3">Expenses</h2>
      <Table>
        <TableRow>
          {expenseHeaders.map((header) => (
            <TableHeaderCell key={header} content={header} />
          ))}
        </TableRow>
        {expenses.map((item, index) => (
          <TableRow key={index}>
            <TableCell content={dayjs(item.date).format("DD-MM-YYYY")} />
            <TableCell content={item.purpose} />
            <TableCell content={item.quantity} />
            <TableCell content={`$${item.price.toFixed(2)}`} />
            <TableCell content={`$${item.amount.toFixed(2)}`} />
          </TableRow>
        ))}
        {expenseTotals && expenses && expenses.length > 0 && (
          <TableRow>
            <TableCell content={<strong>Total</strong>} />
            <TableCell content="" />
            <TableCell content={<strong>{expenseTotals.quantity}</strong>} />
            <TableCell content="" />
            <TableCell
              content={<strong>${expenseTotals.amount.toFixed(2)}</strong>}
            />
          </TableRow>
        )}
      </Table>
      {expenses && expenses.length === 0 && (
        <div className="bg-gray-50 p-6 text-center text-gray-500">
          No expenses found
        </div>
      )}
    </>
  );
};

export default ExpenseTable;
