export type ListResponse<T> = {
	data: T[];
	limit: number;
	page: number;
	total: number;
};
