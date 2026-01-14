export type BatchOverviewFilterRequest = {
  season_id: number | null;
  batch_id: number | null;
};

export type BatchOverviewData = {
  // TODO: Define the structure based on backend response
  batch_id: number;
  batch_name: string;
  season_id: number;
  season_name: string;
  // Add more fields as needed
};

export type BatchOverviewResponse = {
  data: BatchOverviewData[];
  // Add pagination or other metadata if needed
};
