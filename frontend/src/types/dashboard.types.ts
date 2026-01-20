export interface MetricData {
  label: string;
  value: number;
  trend: number;
  color: "blue" | "amber" | "emerald" | "rose";
}

export interface DashboardFarm {
  id: number;
  name: string;
  place: string;
  capacity: string;
  status: "active" | "inactive";
}

export interface DashboardBatch {
  id: number;
  name: string;
  season_name: string;
  farm_name: string;
  status: "active" | "inactive";
  profit?: number;
}

export interface DashboardSeason {
  id: number;
  name: string;
  from_date: string;
  to_date: string;
  status: number;
  revenue?: number;
  expense?: number;
  margin?: number;
}

export interface DashboardSale {
  id: number;
  date: string;
  buyer_name: string;
  batch_name: string;
  weight: number;
  amount: number;
}

export interface DashboardPurchase {
  id: number;
  invoice_date: string;
  name: string;
  vendor_name: string;
  quantity: number;
  net_amount: number;
  payment_type: "credit" | "paid";
}

export interface DashboardTransaction {
  id: number;
  date: string;
  description: string;
  category: string;
  type: "credit" | "debit";
  amount: number;
}

export interface ManagerDashboardData {
  metrics: MetricData[];
  farms: DashboardFarm[];
  batches: DashboardBatch[];
  seasons: DashboardSeason[];
  sales: DashboardSale[];
  purchases: DashboardPurchase[];
  transactions: DashboardTransaction[];
  balanceInHand: number;
  totalCredited: number;
  totalDebited: number;
}

// Admin Dashboard Types
export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  activeBatches: number;
  totalItems: number;
}

export interface SalesChartData {
  name: string;
  sales: number;
  expenses: number;
  profit: number;
}

export interface ItemDistributionData {
  name: string;
  value: number;
}

export interface BatchStatusData {
  name: string;
  value: number;
}

export interface RecentActivityData {
  id: number;
  activity: string;
  time: string;
  value: string;
}

export interface StockLevelData {
  name: string;
  current: number;
  target: number;
}

export interface AdminDashboardData {
  stats: AdminStats;
  salesData: SalesChartData[];
  itemDistribution: ItemDistributionData[];
  batchStatus: BatchStatusData[];
  recentActivity: RecentActivityData[];
  stockLevels: StockLevelData[];
}
