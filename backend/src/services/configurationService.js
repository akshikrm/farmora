import { Op } from 'sequelize';
import BatchModel from '#models/batch';


const configurationService = {}

// Batch
configurationService.createBatch = async (insertData) => {
	try {
		const data = await BatchModel.create(insertData);
		return { success: true, data };
	} catch (error) {
		return {
			success: false,
			error: error.message
		};
	}
};

configurationService.getAllBatchs = async (page = 1, limit = 10, filters = {}) => {
	try {
		const offset = (page - 1) * limit;
		const whereClause = { ...filters }

		if (filters.name) {
			whereClause.name = { [Op.iLike]: `%${filters.name}%` };
		}

		const { count, rows } = await BatchModel.findAndCountAll({
			where: whereClause,
			limit, offset,
			order: [["id", "DESC"]]
		});

		return {
			success: true, total: count, page, limit,
			totalPages: Math.ceil(count / limit),
			data: rows,
		};
	} catch (error) {
		return {
			success: false,
			message: "Error fetching",
			error: error.message
		};
	}
};

configurationService.getBatchById = async (id) => {
	try {
		const data = await BatchModel.findOne({ where: { id } });
		return { status: true, data: data || [] };
	} catch (error) {
		return {
			success: false,
			message: "Error fetching package",
			error: error.message
		};
	}
};

configurationService.updateBatch = async (id, data) => {
	try {
		const singleData = await BatchModel.findByPk(id);
		if (!singleData) {
			return { status: false, message: "batch not found" };
		}
		await singleData.update(data);

		return { status: true, message: "Item updated successfully", singleData };
	} catch (error) {
		return {
			success: false,
			message: "Error updating package",
			error: error.message
		};
	}
};

configurationService.deleteBatch = async (id) => {
	try {
		const data = await ItemModel.findByPk(id);

		if (!data) { return { status: false, message: "Batch not found" }; }

		await data.destroy();
		return { status: true, message: "Batch deleted successfully" };
	} catch (error) {
		return {
			status: false,
			message: "Error deleting package",
			error: error.message
		};
	}
};

export default configurationService
