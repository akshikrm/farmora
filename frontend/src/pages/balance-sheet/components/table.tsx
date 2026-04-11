import DataLoading from "@components/data-loading";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import TableCell from "@components/TableCell";
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
          then={<AllTables data={data!} />}
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
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="bg-gray-800 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Purpose</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((t, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{formatDate(t.date)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{t.purpose}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        t.type === "in"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {t.type === "in" ? "IN" : "OUT"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900">{formatCurrency(t.amount)}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{formatCurrency(t.balance)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SummaryCards = ({ data }: { data: BalanceSheetResponse }) => {
  const { opening_balance, summary } = data;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <p className="text-sm text-gray-500 mb-1">Opening Balance</p>
        <p className="text-lg font-semibold text-gray-900">{formatCurrency(opening_balance)}</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <p className="text-sm text-green-600 mb-1">Total In</p>
        <p className="text-lg font-semibold text-green-600">{formatCurrency(summary.total_in)}</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <p className="text-sm text-red-600 mb-1">Total Out</p>
        <p className="text-lg font-semibold text-red-600">{formatCurrency(summary.total_out)}</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <p className="text-sm text-gray-500 mb-1">Closing Balance</p>
        <p className="text-lg font-bold text-gray-900">{formatCurrency(summary.closing_balance)}</p>
      </div>
    </div>
  );
};

const DetailsCard = ({ data }: { data: BalanceSheetResponse }) => {
  const { summary } = data;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="bg-gray-800 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Balance Details</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-600">Liability (Unpaid)</td>
              <td className="px-4 py-3 text-sm text-right font-medium text-orange-600">{formatCurrency(summary.liability)}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-600">Receivable (Unpaid)</td>
              <td className="px-4 py-3 text-sm text-right font-medium text-yellow-600">{formatCurrency(summary.receivable)}</td>
            </tr>
            <tr className="hover:bg-gray-50 bg-gray-50">
              <td className="px-4 py-3 text-sm font-semibold text-gray-900">Net</td>
              <td className={`px-4 py-3 text-sm text-right font-bold ${summary.net >= 0 ? "text-green-600" : "text-red-600"}`}>
                {formatCurrency(summary.net)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const BreakdownTable = ({ data }: { data: BalanceSheetResponse }) => {
  const { breakdown } = data;

  const rows = [
    { label: "Purchases", in: breakdown.purchases.in, out: breakdown.purchases.out, liability: breakdown.purchases.liability },
    { label: "Sales", in: breakdown.sales.in, out: 0, receivable: breakdown.sales.receivable },
    { label: "Purchase Returns", in: breakdown.purchase_returns.in, out: 0, liabilityReduction: breakdown.purchase_returns.liability_reduction },
    { label: "Working Costs", in: breakdown.working_costs.in, out: breakdown.working_costs.out },
    { label: "General Expenses", in: 0, out: breakdown.general_expenses.out },
    { label: "Expense Sales", in: breakdown.expense_sales.in, out: 0 },
    { label: "Integration Books", in: 0, out: breakdown.integration_books.out, liability: breakdown.integration_books.liability },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="bg-gray-800 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Breakdown by Category</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">In</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Out</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Pending</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, index) => {
              const pending = row.liability || row.receivable || row.liabilityReduction || 0;
              const pendingLabel = row.liabilityReduction ? "Liability Reduction" : row.liability ? "Liability" : row.receivable ? "Receivable" : "-";
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.label}</td>
                  <td className="px-4 py-3 text-sm text-right text-green-600">{row.in > 0 ? formatCurrency(row.in) : "-"}</td>
                  <td className="px-4 py-3 text-sm text-right text-red-600">{row.out > 0 ? formatCurrency(row.out) : "-"}</td>
                  <td className="px-4 py-3 text-sm text-right text-orange-600">{pending > 0 ? `${pendingLabel}: ${formatCurrency(pending)}` : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AllTables = ({ data }: { data: BalanceSheetResponse }) => {
  const { transactions } = data;

  return (
    <div>
      <SummaryCards data={data} />
      <TransactionsTable transactions={transactions} />
      <DetailsCard data={data} />
      <BreakdownTable data={data} />
    </div>
  );
};

export default BalanceSheetTable;
