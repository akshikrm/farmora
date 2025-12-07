import type { ListResponse } from "./response.types";

export type NewFarmRequest = {
  name: string;
  place: string;
  capacity: string;
};

export type EditFarmRequest = Partial<NewFarmRequest> & {
  id: number;
};

export type EditFarmPayload = Partial<NewFarmRequest>;

export type Farm = {
  id: number;
  master_id: number;
  name: string;
  place: string;
  capacity: string;
  own: Boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type FarmsListResponse = ListResponse<Farm>;
