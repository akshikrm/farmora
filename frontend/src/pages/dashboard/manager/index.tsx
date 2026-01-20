import { useAuth } from "@store/authentication/context";
import { useQuery } from "@tanstack/react-query";
import MetricCard from "./components/MetricCard";
import DataListings from "./components/DataListings";
import PerformanceCharts from "./components/PerformanceCharts";
import SectionHeader from "./components/SectionHeader";
import dashboardApi from "@api/dashboard.api";
import type { ManagerDashboardData } from "@app-types/dashboard.types";
import { CircularProgress, Box } from "@mui/material";

const ManagerDashboard = () => {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery<ManagerDashboardData>({
    queryKey: ["manager-dashboard"],
    queryFn: dashboardApi.fetchManagerDashboard,
  });

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center h-96">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box className="flex items-center justify-center h-96">
        <p className="text-red-500">Failed to load dashboard data</p>
      </Box>
    );
  }

  return (
    <div className="py-4 px-3 w-full space-y-12">
      {/* Welcome Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-1">
          Hi, {user?.name} 👋
        </h1>
        <p className="text-slate-500">
          Welcome back! Here's what's happening with your farm today.
        </p>
      </div>

      {/* 1. KEY PERFORMANCE INDICATORS */}
      <section className="animate-in fade-in duration-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.metrics.map((metric, idx) => (
            <MetricCard key={idx} {...metric} />
          ))}
        </div>
      </section>

      {/* 2. COMPACT BALANCE SECTION */}
      <section className="w-full">
        <div className="bg-gradient-to-br from-green-700 to-green-800 p-6 md:p-8 rounded-2xl text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-12 -mt-12 blur-2xl"></div>
          <div className="relative z-10">
            <p className="text-green-100 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Balance in Hand
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              ${data.balanceInHand.toLocaleString()}
            </h2>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="bg-white/10 px-5 py-4 rounded-xl backdrop-blur-md border border-white/10 min-w-[180px]">
              <p className="text-[10px] text-green-200 uppercase font-bold mb-1">
                Total Credited (30d)
              </p>
              <p className="text-xl font-bold text-emerald-300">
                +${data.totalCredited.toLocaleString()}
              </p>
            </div>
            <div className="bg-white/10 px-5 py-4 rounded-xl backdrop-blur-md border border-white/10 min-w-[180px]">
              <p className="text-[10px] text-green-200 uppercase font-bold mb-1">
                Total Debited (30d)
              </p>
              <p className="text-xl font-bold text-rose-300">
                -${data.totalDebited.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FARMS LISTING */}
      <section>
        <SectionHeader
          title="Farm Operations"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.657M7 20h11a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <DataListings.FarmsListing data={data.farms} />
      </section>

      {/* 4. BATCH OVERVIEW (Graph + List) */}
      <section>
        <SectionHeader
          title="Batch Performance Analysis"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
        />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-6">
              Profit/Loss Trend per Batch
            </h3>
            <div className="h-[400px]">
              <PerformanceCharts.BatchChart
                data={data.batches.map((b) => ({
                  name: b.name,
                  value: b.profit || 0,
                }))}
              />
            </div>
          </div>
          <DataListings.BatchesListing data={data.batches.slice(0, 8)} />
        </div>
      </section>

      {/* 5. SEASON OVERVIEW (Graph + List) */}
      <section>
        <SectionHeader
          title="Seasonal Performance Trends"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
          }
        />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-6">
              Revenue vs Expense by Season
            </h3>
            <div className="h-[400px]">
              <PerformanceCharts.SeasonChart
                data={data.seasons.map((s) => ({
                  name: s.name,
                  revenue: s.revenue || 0,
                  expense: s.expense || 0,
                }))}
              />
            </div>
          </div>
          <DataListings.SeasonsListing data={data.seasons} />
        </div>
      </section>

      {/* 6. COMMERCE LEDGER (Sales + Purchases) */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <SectionHeader
            title="Latest Sales"
            icon={
              <svg
                className="w-5 h-5"
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
            }
          />
          <DataListings.SalesListing data={data.sales} />
        </div>
        <div>
          <SectionHeader
            title="Recent Purchases"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            }
          />
          <DataListings.PurchasesListing data={data.purchases} />
        </div>
      </section>

      {/* 7. FULL TRANSACTION HISTORY */}
      <section className="pb-12">
        <SectionHeader
          title="Recent Transactions"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
        />
        <DataListings.TransactionsListing data={data.transactions} />
      </section>
    </div>
  );
};

export default ManagerDashboard;
