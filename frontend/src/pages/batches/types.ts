import type { FarmName } from "@app-types/farms.types";
import type { NameResponse } from "@app-types/gen.types";
import type { ListResponse } from "@app-types/response.types";
import type { SeasonName } from "@app-types/season.types";
import type { ValidationError } from "@errors/api.error";

export type Batch = {
  id: number;
  farm: FarmName;
  season: SeasonName;
  name: string;
  status: number;
};

export type BatchName = NameResponse;

export type BatchListResponse = ListResponse<Batch>;

export type NewBatchRequest = {
  farm_id: number | null;
  season_id: number | null;
  name: string;
  status: string;
};

export type EditBatchRequest = Partial<NewBatchRequest> & { id: number };

export type EditBatchPayload = Omit<EditBatchRequest, "id">;

export type BatchFormValues = {
  farm_id: number | "";
  season_id: number | "";
  name: string;
  status: "active" | "inactive";
};

type UseBatchReturn = {
  onSubmit: (inputData: BatchFormValues) => void;
  errors: ValidationError[];
  clearError: () => void;
};

type Opts = {
  onSuccess: () => void;
};

export type UseAddBatch = (opts: Opts) => UseBatchReturn;

export type UseEditBatch = (
  selectedId: number | null,
  opts: Opts,
) => UseBatchReturn;
