export type SeasonOverviewFilterRequest = {
  season_id: number | null;
};

export type BatchOverviewItem = {
  batch_id: number;
  batch_name: string;
  close_date: string | null;
  avg_weight: number;
  fcr: number;
  cfsr: number;
  avg_cost: number;
  avg_rate: number;
  profit_loss_percentage: number;
  profit: number;
};

export type GeneralCostItem = {
  id: number;
  date: string;
  purpose: string;
  amount: number;
};

export type GeneralSaleItem = {
  id: number;
  date: string;
  purpose: string;
  amount: number;
};

export type SeasonOverviewSummary = {
  total_batch_profit: number;
  total_general_cost: number;
  total_general_sales: number;
  investor_profit: number;
};

export type SeasonOverviewResponse = {
  season: {
    id: number;
    name: string;
  } | null;
  batches: BatchOverviewItem[];
  general_costs: GeneralCostItem[];
  general_sales: GeneralSaleItem[];
  summary: SeasonOverviewSummary;
};
