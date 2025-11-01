import { SeasonNotFoundError } from "#errors/season.errors";
import SeasonModel from "#models/season";
import { Op } from "sequelize";

const create = async (payload) => {
	const newSeason = await SeasonModel.create(payload);
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

const getByID = async (seasonID) => {
	const seasonRecord = await SeasonModel.findOne({ where: { id: seasonID } });
	if (!seasonRecord) {
		throw new SeasonNotFoundError(seasonID);
	}
	return seasonRecord;
};

const updateByID = async (seasonID, payload) => {
	const seasonRecord = await getByID(seasonID);
	await seasonRecord.update(payload);
};

const deleteByID = async (packageID) => {
	const seasonRecord = await getByID(packageID);
	await seasonRecord.destroy();
};



const seasonService = {
	create,
	getAll,
	getByID,
	updateByID,
	deleteByID,
}


export default seasonService;
