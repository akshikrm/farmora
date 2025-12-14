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

export type SeasonName = {
  id: number;
  name: string;
};

export type NewSeasonRequest = {
  name: string;
  from_date: string;
  to_date: string;
};

export type EditSeasonRequest = Partial<NewSeasonRequest> & { id: number };

export type EditSeasonPayload = Omit<EditSeasonRequest, "id">;
