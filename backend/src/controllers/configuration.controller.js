import batchService from "#services/batch.service";
import asyncHandler from "#utils/async-handler";

const create = async (req, res) => {
	const payload = req.body;
	const newBatch = await batchService.create(payload);
	res.success(newBatch, { message: 'Batch created successfully', statusCode: 201 });
};

const getAll = async (req, res) => {
	const filter = {
		page: parseInt(req.query.page) || 1,
		limit: parseInt(req.query.limit) || 10,
	}

	if (req.query.season_id) { filter.season_id = req.query.season_id }
	if (req.query.farm_id) { filter.farm_id = req.query.farm_id }
	if (req.query.status) { filter.status = req.query.status }

	const batchRecords = await batchService.getAll(filter);
	res.success(batchRecords, { message: 'Batches fetched successfully' });
};

const getById = async (req, res) => {
	const { batch_id } = req.params;
	const batchRecord = await batchService.getById(batch_id);
	res.success(batchRecord, { message: 'Batch details fetched successfully' });
};

const updateBatch = async (req, res) => {
	const { batch_id } = req.params;
	const payload = req.body;
	await batchService.updateById(batch_id, payload);
	res.success(null, { message: 'Batch updated successfully' });
};

const deleteById = async (req, res) => {
	const { batch_id } = req.params;
	await batchService.deleteById(batch_id);
	res.success(null, { message: 'Batch deleted successfully', statusCode: 204 });
};


const batchController = {
	create: asyncHandler(create),
	getAll: asyncHandler(getAll),
	getById: asyncHandler(getById),
	updateById: asyncHandler(updateBatch),
	deleteById: asyncHandler(deleteById),
};

export default batchController;

