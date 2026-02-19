type Props = {
  salesTotals: {
    weight: number;
    birds: number;
    amount: number;
  };

  expenseTotals: {
    quantity: number;
    amount: number;
  };
};

const FinancialSummaryTable = (props: Props) => {
  const { salesTotals, expenseTotals } = props;
  return (
    <>
      <h3 className="text-lg font-semibold mb-3">Financial Summary</h3>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Total Expense:</span>
            <span className="font-semibold text-lg text-red-600">
              ${expenseTotals.amount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Total Sales:</span>
            <span className="font-semibold text-lg text-blue-600">
              ${salesTotals.amount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">
              Total Profit (T.P.):
            </span>
            <span
              className={`font-bold text-xl ${
                salesTotals.amount - expenseTotals.amount >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ${(salesTotals.amount - expenseTotals.amount).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialSummaryTable;
