import { SeasonNotFoundError } from "#errors/season.errors";
import seasonService from "#services/season.service";
import asyncHandler from "#utils/async-handler";

const create = async (req, res) => {
	const payload = req.body;
	const newSeason = await seasonService.create(payload);
	res.success(newSeason, { message: 'Season created successfully', statusCode: 201 });
};

const getAll = async (req, res) => {
	const filter = {
		page: parseInt(req.query.page) || 1,
		limit: parseInt(req.query.limit) || 10,
	}

	if (req.query.master_id) { filter.master_id = req.query.master_id }
	if (req.query.status) { filter.status = req.query.status }
	if (req.query.name) { filter.name = req.query.name; }

	const seasonRecords = await seasonService.getAll(
		filter
	);
	res.success(seasonRecords, { message: 'Seasons fetched successfully' });
};

const getByID = async (req, res) => {
	try {
		const { season_id } = req.params;
		const seasonRecord = await seasonService.getByID(season_id);
		res.success(seasonRecord, { message: 'Season details fetched successfully' });
	} catch (error) {
		if (error instanceof SeasonNotFoundError) { error.statusCode = 404; }
		throw error;
	}
};

const udpateByID = async (req, res) => {
	try {
		const { season_id } = req.params;
		const packageData = req.body;
		await seasonService.updateByID(season_id, packageData);
		res.success(null, { message: 'Season updated successfully' });
	} catch (error) {
		if (error instanceof SeasonNotFoundError) { error.statusCode = 404; }
		throw error;
	};
}

const deleteByID = async (req, res) => {
	try {
		const { season_id } = req.params;
		await seasonService.deleteByID(season_id);
		res.success(null, { message: 'Season deleted successfully' });
	} catch (error) {
		if (error instanceof SeasonNotFoundError) { error.statusCode = 404; }
		throw error;
	}
};


const seasonController = {
	create: asyncHandler(create),
	getAll: asyncHandler(getAll),
	getByID: asyncHandler(getByID),
	udpateByID: asyncHandler(udpateByID),
	deleteByID: asyncHandler(deleteByID),
};



export default seasonController;
