import itemService from "#services/item.service";
import asyncHandler from "#utils/async-handler";

const create = async (req, res) => {
	const payload = req.body;
	const newItem = await itemService.create(payload);

	res.success(newItem, { message: 'Configuration item created successfully', statusCode: 201 });
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

	const itemRecords = await itemService.getAll(filter);
	res.success(itemRecords, { message: 'Configuration items fetched successfully' });
};

const getById = async (req, res) => {
	const { item_id } = req.params;
	const itemRecord = await itemService.getById(item_id);
	res.success(itemRecord, { message: 'Configuration item details fetched successfully' });

};

const updateById = async (req, res) => {
	const { item_id } = req.params;
	const payload = req.body;
	await itemService.updateById(item_id, payload);
	res.success(null, { message: 'Configuration item updated successfully' });

};

const deleteById = async (req, res) => {
	const { item_id } = req.params;
	await itemService.deleteById(item_id);
	res.success(null, { message: 'Configuration item deleted successfully', statusCode: 204 });

};


const itemController = {
	create: asyncHandler(create),
	getAll: asyncHandler(getAll),
	getById: asyncHandler(getById),
	updateById: asyncHandler(updateById),
	deleteById: asyncHandler(deleteById),
};


export default itemController;

