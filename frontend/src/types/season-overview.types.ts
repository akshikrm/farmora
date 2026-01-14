export type SeasonOverviewFilterRequest = {
  season_id: number | null;
};

export type SeasonOverviewData = {
  // TODO: Define the structure based on backend response
  season_id: number;
  season_name: string;
  // Add more fields as needed
};

export type SeasonOverviewResponse = {
  data: SeasonOverviewData[];
  // Add pagination or other metadata if needed
};
