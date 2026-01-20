import type { MetricData } from "../types";

const colorMap: Record<string, string> = {
  blue: "text-green-600 bg-green-50 border-green-100",
  amber: "text-amber-600 bg-amber-50 border-amber-100",
  emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
  rose: "text-rose-600 bg-rose-50 border-rose-100",
};

const MetricCard = ({ label, value, trend, color }: MetricData) => {
  const isPositive = trend >= 0;
  const accentColor = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl border ${accentColor}`}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div
          className={`flex items-center text-xs font-bold px-2 py-1 rounded-lg ${
            isPositive
              ? "text-emerald-600 bg-emerald-50"
              : "text-rose-600 bg-rose-50"
          }`}
        >
          {isPositive ? "+" : ""}
          {trend}%
          <svg
            className={`w-3 h-3 ml-1 ${isPositive ? "" : "rotate-180"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
          {value < 0 ? "-" : ""}₹
          {Math.abs(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h3>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-50">
        <div className="flex items-center text-xs text-slate-400">
          <span className="font-semibold text-slate-500 mr-2">Prev:</span>₹
          {(Math.abs(value) * (1 - trend / 100)).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
