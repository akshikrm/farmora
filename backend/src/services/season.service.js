import { SeasonNotFoundError } from "#errors/season.errors";
import SeasonModel from "#models/season";
import dayjs from "dayjs";
import { Op } from "sequelize";

const create = async (payload) => {
	const fromDate = dayjs(payload.from_date).toISOString()
	const toDate = dayjs(payload.to_date).toISOString()


	console.log('fromDate:', fromDate);
	console.log('toDate:', toDate);

	const entryData = {
		master_id: payload.master_id,
		name: payload.name,
		from_date: dayjs(payload.from_date).toISOString(),
		to_date: dayjs(payload.to_date).toISOString(),
		status: 1,
	}
	const newSeason = await SeasonModel.create(entryData);
	return newSeason;
};

const getAll = async (payload = {}) => {
	const { page, limit, ...filter } = payload;
	const offset = (page - 1) * limit;

	if (filter.name) {
		filter.name = { [Op.iLike]: `%${filter.name}%` };
	}

	const { count, rows } = await SeasonModel.findAndCountAll({
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

const getById = async (seasonID) => {
	const seasonRecord = await SeasonModel.findOne({ where: { id: seasonID } });
	if (!seasonRecord) {
		throw new SeasonNotFoundError(seasonID);
	}
	return seasonRecord;
};

const updateById = async (seasonID, payload) => {
	const seasonRecord = await getById(seasonID);
	await seasonRecord.update(payload);
};

const deleteById = async (packageID) => {
	const seasonRecord = await getById(packageID);
	await seasonRecord.destroy();
};



const seasonService = {
	create,
	getAll,
	getById,
	updateById,
	deleteById,
}


export default seasonService;
