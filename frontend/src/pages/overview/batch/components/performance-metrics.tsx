type Props = {
  fcrMetrics: {
    averageWeight: string;
    fcr: string;
    cfcr: string;
    avgCost: string;
    avgRate: string;
    costRateDifference: string;
  };
};

const PerformanceMetrics = ({ fcrMetrics }: Props) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-3">Performance Metrics</h3>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">Average Weight (kg/bird):</span>
            <span className="font-semibold text-lg">
              {fcrMetrics.averageWeight}
            </span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">FCR (Feed Conversion Ratio):</span>
            <span className="font-semibold text-lg">{fcrMetrics.fcr}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">CFCR (Corrected FCR):</span>
            <span className="font-semibold text-lg text-blue-600">
              {fcrMetrics.cfcr}
            </span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">AVG COST ($/kg):</span>
            <span className="font-semibold text-lg">${fcrMetrics.avgCost}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600">AVG RATE ($/kg):</span>
            <span className="font-semibold text-lg">${fcrMetrics.avgRate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">AVG COST - RATE DIFFERENCE:</span>
            <span
              className={`font-semibold text-lg ${
                parseFloat(fcrMetrics.costRateDifference) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ${fcrMetrics.costRateDifference}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerformanceMetrics;
