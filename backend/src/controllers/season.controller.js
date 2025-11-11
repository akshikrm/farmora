import seasonService from "#services/season.service";
import asyncHandler from "#utils/async-handler";

const create = async (req, res) => {
	const { id } = req.user;
	const payload = { ...req.body, master_id: id };

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

const getById = async (req, res) => {
	const { season_id } = req.params;
	const seasonRecord = await seasonService.getById(season_id);
	res.success(seasonRecord, { message: 'Season details fetched successfully' });
};

const updateById = async (req, res) => {
	const { season_id } = req.params;
	const packageData = req.body;
	await seasonService.updateById(season_id, packageData);
	res.success(null, { message: 'Season updated successfully' });
}

const deleteById = async (req, res) => {
	const { season_id } = req.params;
	await seasonService.deleteById(season_id);
	res.success(null, { message: 'Season deleted successfully' });
};


const seasonController = {
	create: asyncHandler(create),
	getAll: asyncHandler(getAll),
	getById: asyncHandler(getById),
	updateById: asyncHandler(updateById),
	deleteById: asyncHandler(deleteById),
};



export default seasonController;
