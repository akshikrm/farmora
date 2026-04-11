import Table from "@components/Table";
import TableRow from "@components/TableRow";
import TableCell from "@components/TableCell";
import DataLoading from "@components/data-loading";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import type { BalanceSheetResponse, Transaction } from "../types";
import dayjs from "dayjs";

type Props = {
  data: BalanceSheetResponse | null;
  isLoading: boolean;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY");
};

const BalanceSheetTable = ({ data, isLoading }: Props) => {
  return (
    <Ternary
      when={isLoading}
      then={<DataLoading />}
      otherwise={
        <Ternary
          when={data !== null}
          then={<SummaryTable data={data!} />}
          otherwise={
            <DataNotFound
              title="No data found"
              description="Apply filters to view balance sheet"
            />
          }
        />
      }
    />
  );
};

const TransactionsTable = ({ transactions }: { transactions: Transaction[] }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="bg-gray-700 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Transactions</h3>
        </div>
        <div className="p-4 text-center text-gray-500">
          No transactions found
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="bg-gray-700 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Transactions</h3>
      </div>
      <Table>
        <thead>
          <TableRow className="bg-gray-50">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Balance</th>
          </TableRow>
        </thead>
        <tbody>
          {transactions.map((t, index) => (
            <TableRow key={index}>
              <TableCell content={formatDate(t.date)} />
              <TableCell content={t.purpose} />
              <TableCell
                content={
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      t.type === "in"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {t.type.toUpperCase()}
                  </span>
                }
              />
              <TableCell
                content={formatCurrency(t.amount)}
                className="text-right"
              />
              <TableCell
                content={formatCurrency(t.balance)}
                className="text-right font-medium"
              />
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const SummaryTable = ({ data }: { data: BalanceSheetResponse }) => {
  const { opening_balance, summary, breakdown, transactions } = data;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Balance Summary</h3>
        </div>
        <Table>
          <tbody>
            <TableRow>
              <TableCell content="Opening Balance" className="font-semibold" />
              <TableCell
                content={formatCurrency(opening_balance)}
                className="text-right font-semibold"
              />
            </TableRow>
            <TableRow>
              <TableCell content="Total In" className="text-green-600 font-medium" />
              <TableCell
                content={formatCurrency(summary.total_in)}
                className="text-right text-green-600"
              />
            </TableRow>
            <TableRow>
              <TableCell content="Total Out" className="text-red-600 font-medium" />
              <TableCell
                content={formatCurrency(summary.total_out)}
                className="text-right text-red-600"
              />
            </TableRow>
            <TableRow>
              <TableCell content="Liability (Unpaid)" className="text-orange-600 font-medium" />
              <TableCell
                content={formatCurrency(summary.liability)}
                className="text-right text-orange-600"
              />
            </TableRow>
            <TableRow>
              <TableCell content="Receivable (Unpaid)" className="text-yellow-600 font-medium" />
              <TableCell
                content={formatCurrency(summary.receivable)}
                className="text-right text-yellow-600"
              />
            </TableRow>
            <TableRow>
              <TableCell content="Net" className="font-semibold" />
              <TableCell
                content={formatCurrency(summary.net)}
                className={`text-right font-semibold ${
                  summary.net >= 0 ? "text-green-600" : "text-red-600"
                }`}
              />
            </TableRow>
            <TableRow className="bg-gray-100">
              <TableCell content="Closing Balance" className="font-bold" />
              <TableCell
                content={formatCurrency(summary.closing_balance)}
                className="text-right font-bold text-lg"
              />
            </TableRow>
          </tbody>
        </Table>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-700 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Breakdown by Category</h3>
        </div>
        <Table>
          <tbody>
            <TableRow>
              <TableCell content="Purchases" className="font-medium" />
              <TableCell
                content={`In: ${formatCurrency(breakdown.purchases.in)}`}
                className="text-right"
              />
              <TableCell
                content={`Out: ${formatCurrency(breakdown.purchases.out)}`}
                className="text-right"
              />
              <TableCell
                content={`Liability: ${formatCurrency(breakdown.purchases.liability)}`}
                className="text-right"
              />
            </TableRow>
            <TableRow>
              <TableCell content="Sales" className="font-medium" />
              <TableCell
                content={`In: ${formatCurrency(breakdown.sales.in)}`}
                className="text-right"
              />
              <TableCell content="-" className="text-right" />
              <TableCell
                content={`Receivable: ${formatCurrency(breakdown.sales.receivable)}`}
                className="text-right"
              />
            </TableRow>
            <TableRow>
              <TableCell content="Purchase Returns" className="font-medium" />
              <TableCell
                content={`In: ${formatCurrency(breakdown.purchase_returns.in)}`}
                className="text-right"
              />
              <TableCell content="-" className="text-right" />
              <TableCell
                content={`Liability Reduction: ${formatCurrency(breakdown.purchase_returns.liability_reduction)}`}
                className="text-right"
              />
            </TableRow>
            <TableRow>
              <TableCell content="Working Costs" className="font-medium" />
              <TableCell
                content={`In: ${formatCurrency(breakdown.working_costs.in)}`}
                className="text-right"
              />
              <TableCell
                content={`Out: ${formatCurrency(breakdown.working_costs.out)}`}
                className="text-right"
              />
              <TableCell content="-" className="text-right" />
            </TableRow>
            <TableRow>
              <TableCell content="General Expenses" className="font-medium" />
              <TableCell content="-" className="text-right" />
              <TableCell
                content={`Out: ${formatCurrency(breakdown.general_expenses.out)}`}
                className="text-right"
              />
              <TableCell content="-" className="text-right" />
            </TableRow>
            <TableRow>
              <TableCell content="Expense Sales" className="font-medium" />
              <TableCell
                content={`In: ${formatCurrency(breakdown.expense_sales.in)}`}
                className="text-right"
              />
              <TableCell content="-" className="text-right" />
              <TableCell content="-" className="text-right" />
            </TableRow>
            <TableRow>
              <TableCell content="Integration Books" className="font-medium" />
              <TableCell content="-" className="text-right" />
              <TableCell
                content={`Out: ${formatCurrency(breakdown.integration_books.out)}`}
                className="text-right"
              />
              <TableCell
                content={`Liability: ${formatCurrency(breakdown.integration_books.liability)}`}
                className="text-right"
              />
            </TableRow>
          </tbody>
        </Table>
      </div>

      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default BalanceSheetTable;
