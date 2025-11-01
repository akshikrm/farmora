import { VendorNotFoundError } from "#errors/vendor.errors";
import VendorModel from "#models/vendor";
import { Op } from "sequelize";

const create = async (payload) => {
	const newVendor = await VendorModel.create(payload);
	return newVendor
};

const getAll = async (payload) => {
	const { page, limit, ...filter } = payload;
	const offset = (page - 1) * limit;

	if (filter.name) {
		filter.name = { [Op.iLike]: `%${filter.name}%` };
	}
	const { count, rows } = await VendorModel.findAndCountAll({
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
	const vendorRecord = await VendorModel.findOne({ where: { id } });
	if (!vendorRecord) {
		throw new VendorNotFoundError(id);
	}
	return vendorRecord;
};

const updateById = async (id, data) => {
	const vendorRecord = await getById(id);
	await vendorRecord.update(data);

};

const deleteById = async (id) => {
	const vendorRecord = await getById(id);
	await vendorRecord.destroy();
};



const vendorService = {
	create,
	getAll,
	getById,
	updateById,
	deleteById,
}

export default vendorService;
