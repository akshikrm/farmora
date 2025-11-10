import farmService from "#services/farm.service";
import asyncHandler from "#utils/async-handler";
import userRoles from "#utils/user-roles";

const create = async (req, res) => {
	const payload = { ...req.body, master_id: req.user.id };
	const newFarm = await farmService.create(payload);
	res.success(newFarm, { message: 'Farm created successfully', statusCode: 201 });

};

const getAll = async (req, res) => {
	const filter = {
		page: parseInt(req.query.page) || 1,
		limit: parseInt(req.query.limit) || 10,
	}

	const { user } = req

	if (user.user_type === userRoles.admin.type && req.query.master_id) {
		filter.master_id = req.query.master_id
	}

	if (user.user_type === userRoles.manager.type) {
		filter.master_id = user.id
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
	const { id, user_type } = req.user;

	const filter = { id: farm_id }

	if (user_type === userRoles.manager.type) {
		filter.master_id = id
	}

	const farmRecord = await farmService.getById(filter);
	res.success(farmRecord, { message: 'Farm details fetched successfully' });
};

const updateById = async (req, res) => {
	const { farm_id } = req.params;
	const { id, user_type } = req.user;

	const masterID = user_type === userRoles.manager.type ? id : null;

	await farmService.updateById(farm_id, masterID, req.body);
	res.success(null, { message: 'Farm updated successfully' });
};

const deletById = async (req, res) => {
	const { farm_id } = req.params;
	const { id, user_type } = req.user;

	const masterID = user_type === userRoles.manager.type ? id : null;

	await farmService.deleteById(farm_id, masterID);
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

