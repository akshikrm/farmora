import type { ListResponse } from "@app-types/response.types";

export type IntegrationBookRecord = {
  id: number;
  farm_id: number;
  master_id: number;
  date: string;
  amount: number;
  payment_type: 'credit' | 'paid';
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
};

export type IntegrationBookFilterRequest = {
  farm_id: number | null;
  start_date: string;
  end_date: string;
};

export type IntegrationBookListResponse = {
  credit_items: IntegrationBookRecord[];
  paid_items: IntegrationBookRecord[];
};

export type IntegrationBookFormValues = {
  farm_id: number | null;
  amount: string;
  date: string;
  payment_type: 'credit' | 'paid';
};

export type NewIntegrationBookRequest = {
  farm_id: number | null;
  amount: number | string;
  date: string;
  payment_type: 'credit' | 'paid';
};

export type EditIntegrationBookRequest = Partial<NewIntegrationBookRequest> & {
  id: number;
};

export type IntegrationBookNamesResponse = ListResponse<{
  id: number;
  name: string;
}>;
