import type { FarmName } from "./farms.types";
import type { NameResponse } from "./gen.types";
import type { SeasonName } from "./season.types";

export type Batch = {
  id: number;
  farm: FarmName;
  season: SeasonName;
  name: string;
  status: number;
};

export type BatchName = NameResponse;

export type NewBatchRequest = {
  farm_id: number | null;
  season_id: number | null;
  name: string;
  status: string;
};

export type EditBatchRequest = Partial<NewBatchRequest> & { id: number };

export type EditBatchPayload = Omit<EditBatchRequest, "id">;
