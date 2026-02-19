export type BatchOverviewFilterRequest = {
  season_id: number | "";
  batch_id: number | "";
};

export type BatchOverviewExpense = {
  date: string;
  purpose: string;
  quantity: number;
  price: number;
  amount: number;
};

export type BatchOverviewSale = {
  date: string;
  vehicle_no: string;
  weight: number | null;
  bird_no: number | null;
  avg_weight: number | null;
  price: number | null;
  amount: number;
};

export type BatchOverviewReturn = {
  date: string;
  purpose: string;
  quantity: number;
  price: number;
  amount: number;
};

export type BatchOverviewBatch = {
  id: number;
  name: string;
  season: {
    id: number;
    name: string;
  } | null;
};

export type BatchOverviewData = {
  batch: BatchOverviewBatch | null;
  expenses: BatchOverviewExpense[];
  sales: BatchOverviewSale[];
  returns: BatchOverviewReturn[];
};

export type BatchOverviewResponse = BatchOverviewData;
