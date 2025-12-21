import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { TrendingUp, Package, Activity, ShoppingCart } from "lucide-react";
import { StatCard } from "./components/StatCard";
import { SalesChart } from "./components/SalesChart";
import { ItemDistributionChart } from "./components/ItemDistributionChart";
import { RecentActivity } from "./components/RecentActivity";
import { StockLevels } from "./components/StockLevels";
import { BatchStatusChart } from "./components/BatchStatusChart";
import {
  generateSalesData,
  generateItemDistribution,
  generateBatchStatus,
  generateRecentActivity,
  generateStockLevels,
  generateStats,
} from "./utils/generateData";

export const Dashboard = () => {
  const [salesData, setSalesData] = useState(generateSalesData());
  const [itemDistribution, setItemDistribution] = useState(
    generateItemDistribution(),
  );
  const [batchStatus, setBatchStatus] = useState(generateBatchStatus());
  const [recentActivity, setRecentActivity] = useState(
    generateRecentActivity(),
  );
  const [stockLevels, setStockLevels] = useState(generateStockLevels());
  const [stats, setStats] = useState(generateStats());

  useEffect(() => {
    setSalesData(generateSalesData());
    setItemDistribution(generateItemDistribution());
    setBatchStatus(generateBatchStatus());
    setRecentActivity(generateRecentActivity());
    setStockLevels(generateStockLevels());
    setStats(generateStats());
  }, []);

  return (
    <Box sx={{ py: 4, px: 3, width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your farm today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4, width: "100%" }}>
        <Grid size={3}>
          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon={<TrendingUp size={24} />}
            trend="+12.5%"
          />
        </Grid>
        <Grid size={3}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<ShoppingCart size={24} />}
            trend="+8.2%"
          />
        </Grid>
        <Grid size={3}>
          <StatCard
            title="Active Batches"
            value={stats.activeBatches}
            icon={<Activity size={24} />}
            trend="+3.1%"
          />
        </Grid>
        <Grid size={3}>
          <StatCard
            title="Total Items"
            value={stats.totalItems}
            icon={<Package size={24} />}
            trend="+5.7%"
          />
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 4, width: "100%" }}>
        <Grid size={6}>
          <SalesChart data={salesData} />
        </Grid>
        <Grid size={6}>
          <ItemDistributionChart data={itemDistribution} />
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} sx={{ width: "100%" }}>
        <Grid size={6}>
          <BatchStatusChart data={batchStatus} />
        </Grid>
        <Grid size={6}>
          <StockLevels stocks={stockLevels} />
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Box sx={{ mt: 4 }}>
        <RecentActivity activities={recentActivity} />
      </Box>
    </Box>
  );
};

export default Dashboard;
