import type { Season } from './season.types';

export type GeneralSalesRecord = {
  id: number;
  season_id: number;
  master_id: number;
  purpose: string;
  date: string;
  amount: number;
  narration: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  season?: Season;
};

export type GeneralSalesFilterRequest = {
  season_id: number | null;
  start_date: string;
  end_date: string;
};

export type GeneralSalesListResponse = GeneralSalesRecord[];

export type NewGeneralSalesRequest = {
  season_id: number | null;
  purpose: string;
  amount: number | string;
  narration?: string | null;
};

export type EditGeneralSalesRequest = {
  id: number;
  season_id: number | null;
  purpose: string;
  amount: number | string;
  narration?: string | null;
};

export type EditGeneralSalesPayload = Omit<EditGeneralSalesRequest, "id">;
