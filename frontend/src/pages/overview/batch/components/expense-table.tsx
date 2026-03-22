import type { BatchOverviewExpense } from "@app-types/batch-overview.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import dayjs from "dayjs";

const expenseHeaders = ["Date", "Purpose", "Quantity", "Price", "Amount"];

type Props = {
  expenses: BatchOverviewExpense[];
  totalPurchaseAmount: number;
  totalPurchaseFeeds: number;
};

const ExpenseTable = (props: Props) => {
  const { expenses, totalPurchaseAmount, totalPurchaseFeeds } = props;

  return (
    <>
      <h2 className="text-xl font-semibold mb-3">Expenses</h2>
      <Table>
        <TableRow>
          {expenseHeaders.map((header) => (
            <TableHeaderCell key={header} content={header} />
          ))}
        </TableRow>
        {expenses.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell content={dayjs(item.date).format("DD-MM-YYYY")} />
              <TableCell
                content={
                  <span className="capitalize">{item.category.type}</span>
                }
              />
              <TableCell content={item.quantity} />
              <TableCell content={`$${item.price_per_unit}`} />
              <TableCell content={`$${item.net_amount}`} />
            </TableRow>
          );
        })}

        <TableRow>
          <TableCell content={<strong>Total</strong>} />
          <TableCell content="" />
          <TableCell content={<strong>{totalPurchaseFeeds}</strong>} />
          <TableCell content="" />
          <TableCell content={<strong>${totalPurchaseAmount}</strong>} />
        </TableRow>
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
