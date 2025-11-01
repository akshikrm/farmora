import { SeasonNotFoundError } from "#errors/season.errors";
import { createSeasonService, deleteSeasonService, getAllSeasonsService, getSeasonByIdService, updateSeasonService } from "#services/season.controller";

export const createSeason = async (req, res) => {
	const payload = req.body;
	const seasonRecord = await createSeasonService(payload);
	res.success(seasonRecord, { message: 'Season created successfully', statusCode: 201 });
};

export const getAllSeasons = async (req, res) => {
	const filter = {
		page: parseInt(req.query.page) || 1,
		limit: parseInt(req.query.limit) || 10,
	}

	if (req.query.master_id) { filter.master_id = req.query.master_id }
	if (req.query.status) { filter.status = req.query.status }
	if (req.query.name) { filter.name = req.query.name; }

	const seasonRecords = await getAllSeasonsService(
		filter
	);
	res.success(seasonRecords, { message: 'Seasons fetched successfully' });
};

export const getSeasonById = async (req, res) => {
	try {
		const { season_id } = req.params;
		const seasonRecord = await getSeasonByIdService(season_id);
		res.success(seasonRecord, { message: 'Season details fetched successfully' });
	} catch (error) {
		if (error instanceof SeasonNotFoundError) { error.statusCode = 404; }
		throw error;
	}
};

export const updateSeason = async (req, res) => {
	try {
		const { season_id } = req.params;
		const packageData = req.body;
		await updateSeasonService(season_id, packageData);
		res.success(null, { message: 'Season updated successfully' });
	} catch (error) {
		if (error instanceof SeasonNotFoundError) { error.statusCode = 404; }
		throw error;
	};
}

export const deleteSeason = async (req, res) => {
	try {
		const { season_id } = req.params;
		await deleteSeasonService(season_id);
		res.success(null, { message: 'Season deleted successfully' });
	} catch (error) {
		if (error instanceof SeasonNotFoundError) { error.statusCode = 404; }
		throw error;
	}
};

