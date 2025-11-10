import { FarmNotFoundError } from "#errors/farm.errors";
import FarmModel from "#models/farm";
import { Op } from "sequelize";

const create = async (payload) => {
	const newFarm = await FarmModel.create(payload);
	return newFarm;
};

const getAll = async (payload = {}) => {
	const { page, limit, ...filter } = payload;
	const offset = (page - 1) * limit;

	if (filter.name) {
		filter.name = { [Op.iLike]: `%${filter.name}%` };
	}

	const { count, rows } = await FarmModel.findAndCountAll({
		where: filter,
		limit, offset,
		order: [["id", "DESC"]]
	});

	return {
		page,
		limit,
		total: count,
		data: rows,
	};

};

const getById = async (payload) => {
	const { id, master_id } = payload;

	const filter = { id };
	if (master_id) { filter.master_id = master_id; }

	const farmRecord = await FarmModel.findOne({ where: filter });
	if (!farmRecord) {
		throw new FarmNotFoundError(id);
	}
	return farmRecord;
};

const updateById = async (farmId, masterId, payload) => {
	const filter = { id: farmId };
	if (masterId) { filter.master_id = masterId; }

	const farmRecord = await getById(filter);
	await farmRecord.update(payload);
};

const deleteById = async (farmId, masterId) => {
	const filter = { id: farmId, master_id: masterId };
	const farmRecord = await getById(filter);
	await farmRecord.destroy();
};


const farmService = {
	create,
	getAll,
	getById,
	updateById,
	deleteById,
}

export default farmService;

