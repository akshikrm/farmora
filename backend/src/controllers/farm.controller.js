import farmService from "#services/farm.service";
import asyncHandler from "#utils/async-handler";

const create = async (req, res) => {
	const payload = req.body;
	const newFarm = await farmService.create(payload);
	res.success(newFarm, { message: 'Farm created successfully', statusCode: 201 });

};

const getAll = async (req, res) => {
	const filter = {
		page: parseInt(req.query.page) || 1,
		limit: parseInt(req.query.limit) || 10,
	}

	if (req.query.master_id) {
		filter.master_id = req.query.master_id
	}
	if (req.query.status) {
		filter.status = req.query.status
	}
	if (req.query.name) {
		filter.name = req.query.name;
	}

	const farmRecords = await farmService.getAll(filter);
	res.success(farmRecords, { message: 'Farms fetched successfully' });

};

const getById = async (req, res) => {
	const { farm_id } = req.params;
	const farmRecord = await farmService.getById(farm_id);
	res.success(farmRecord, { message: 'Farm details fetched successfully' });
};

const updateById = async (req, res) => {
	const { farm_id } = req.params;
	await farmService.updateById(farm_id, req.body);
	res.success(null, { message: 'Farm updated successfully' });
};

const deletById = async (req, res) => {
	const { farm_id } = req.params;
	await farmService.deleteById(farm_id);
	res.success(null, { message: 'Farm deleted successfully' });
};

const farmController = {
	create: asyncHandler(create),
	getAll: asyncHandler(getAll),
	getById: asyncHandler(getById),
	updateById: asyncHandler(updateById),
	deletById: asyncHandler(deletById),
};

export default farmController;

