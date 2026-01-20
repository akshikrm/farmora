export interface MetricData {
  label: string;
  value: number;
  trend: number;
  color: "blue" | "amber" | "emerald" | "rose";
}

export interface Farm {
  id: number;
  name: string;
  place: string;
  capacity: string;
  status: "active" | "inactive";
}

export interface Batch {
  id: number;
  name: string;
  season_name: string;
  farm_name: string;
  status: "active" | "inactive";
  profit?: number;
}

export interface Season {
  id: number;
  name: string;
  from_date: string;
  to_date: string;
  status: number;
  revenue?: number;
  expense?: number;
  margin?: number;
}

export interface Sale {
  id: number;
  date: string;
  buyer_name: string;
  batch_name: string;
  weight: number;
  amount: number;
}

export interface Purchase {
  id: number;
  invoice_date: string;
  name: string;
  vendor_name: string;
  quantity: number;
  net_amount: number;
  payment_type: "credit" | "paid";
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  type: "credit" | "debit";
  amount: number;
}

export interface ManagerDashboardData {
  metrics: MetricData[];
  farms: Farm[];
  batches: Batch[];
  seasons: Season[];
  sales: Sale[];
  purchases: Purchase[];
  transactions: Transaction[];
  balanceInHand: number;
  totalCredited: number;
  totalDebited: number;
}
