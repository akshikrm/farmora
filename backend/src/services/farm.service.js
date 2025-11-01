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

const getById = async (id) => {
	const farmRecord = await FarmModel.findOne({ where: { id } });
	if (!farmRecord) {
		throw new FarmNotFoundError(id);
	}
	return farmRecord;
};

const updateById = async (id, payload) => {
	const farmRecord = await getById(id);
	await farmRecord.update(payload);
};

const deleteById = async (id) => {
	const farmRecord = await getById(id);
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

