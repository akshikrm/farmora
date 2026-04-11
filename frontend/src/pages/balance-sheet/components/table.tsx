import Table from "@components/Table";
import TableRow from "@components/TableRow";
import TableCell from "@components/TableCell";
import DataLoading from "@components/data-loading";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import type { BalanceSheetResponse } from "../types";

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

const SummaryTable = ({ data }: { data: BalanceSheetResponse }) => {
  const { opening_balance, summary, breakdown } = data;

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
    </div>
  );
};

export default BalanceSheetTable;
