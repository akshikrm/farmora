import type { FarmName } from "./farms.types";
import type { SeasonName } from "./season.types";

export type Batch = {
  farm: FarmName;
  season_id: SeasonName;
  name: string;
  status: number;
};

export type NewBatchRequest = {
  farm_id: number | null;
  season_id: number | null;
  name: string;
  status: string;
};

export type EditBatchRequest = Partial<NewBatchRequest> & { id: number };

export type EditBatchPayload = Omit<EditBatchRequest, "id">;
