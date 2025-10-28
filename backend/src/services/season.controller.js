import { SeasonNotFoundError } from "#errors/season.errors";
import SeasonModel from "#models/season";
import { Op } from "sequelize";

export const createSeasonService = async (payload) => {
	await SeasonModel.create(payload);
};

export const getAllSeasonsService = async (payload = {}) => {
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

export const getSeasonByIdService = async (seasonID) => {
	const seasonRecord = await SeasonModel.findOne({ where: { id: seasonID } });
	if (!seasonRecord) {
		throw new SeasonNotFoundError(seasonID);
	}
	return seasonRecord;
};

export const updateSeasonService = async (seasonID, payload) => {
	const seasonRecord = await getSeasonByIdService(seasonID);
	await seasonRecord.update(payload);
};

export const deleteSeasonService = async (packageID) => {
	const seasonRecord = await getSeasonByIdService(packageID);
	await seasonRecord.destroy();
};

