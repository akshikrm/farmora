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

export type NewSeason = {
  name: string;
  from_date: string;
  to_date: string;
};

export type EditSeason = Partial<NewSeason> & { id: number };

export type EditSeasonPayload = Omit<EditSeason, "id">;
