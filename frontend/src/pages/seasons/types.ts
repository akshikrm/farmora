import type { ListResponse } from "@app-types/response.types";
import type { ValidationError } from "@errors/api.error";

export type Season = {
  id: number;
  master_id: number;
  name: string;
  from_date?: string | null;
  to_date?: string | null;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

export type SeasonListResponse = ListResponse<Season>;

export type SeasonName = {
  id: number;
  name: string;
};

export type SeasonFormValues = {
  name: string;
  from_date: string;
  to_date: string;
  status: 1 | 0;
};

type UseSeasonReturn = {
  onSubmit: (inputData: SeasonFormValues) => void;
  errors: ValidationError[];
  clearError: () => void;
};

type Opts = {
  onSuccess: () => void;
};

export type UseAddSeason = (opts: Opts) => UseSeasonReturn;

// export type EditSeasonRequest = Partial<NewSeasonRequest> & { id: number };
//
// export type EditSeasonPayload = Omit<EditSeasonRequest, "id">;
