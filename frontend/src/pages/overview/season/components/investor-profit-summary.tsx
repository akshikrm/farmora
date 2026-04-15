import { roundNumber } from "@utils/number";

type InvestorProfitSummaryProps = {
  totalProfit: number;
  totalGeneralCost: number;
  totalGeneralSale: number;
};

const InvestorProfitSummary = (props: InvestorProfitSummaryProps) => {
  const { totalProfit, totalGeneralCost, totalGeneralSale } = props;
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Investor Profit Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Batch Profit</p>
          <SummaryItem value={totalProfit} />
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total General Cost</p>
          <SummaryItem value={totalGeneralCost} />
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total General Sales</p>
          <SummaryItem value={totalGeneralSale} />
        </div>
      </div>
    </div>
  );
};

const SummaryItem = ({ value }: { value: number }) => {
  return (
    <p
      className={`text-2xl font-bold ${
        value >= 0 ? "text-blue-600" : "text-red-600"
      }`}
    >
      ₹{roundNumber(value)}
    </p>
  );
};

export default InvestorProfitSummary;
