import { Op } from 'sequelize';
import ItemModel from '#models/item';
import VendorModel from '#models/vendor';
import BatchModel from '#models/batch';


const configurationService = {}

// Vendor
configurationService.createVendor = async (insertData) => {
	try {
		const data = await VendorModel.create(insertData);
		return { success: true, data };
	} catch (error) {
		return {
			success: false,
			error: error.message
		};
	}
};

configurationService.getAllVendors = async (page = 1, limit = 10, filters = {}) => {
	try {
		const offset = (page - 1) * limit;
		const whereClause = { ...filters }

		if (filters.name) {
			whereClause.name = { [Op.iLike]: `%${filters.name}%` };
		}

		const { count, rows } = await VendorModel.findAndCountAll({
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
			message: "Error fetching packages",
			error: error.message
		};
	}
};

configurationService.getVendorById = async (id) => {
	try {
		const data = await VendorModel.findOne({ where: { id } });
		return { status: true, data: data || [] };
	} catch (error) {
		return {
			success: false,
			message: "Error fetching package",
			error: error.message
		};
	}
};

configurationService.updateVendor = async (id, data) => {
	try {
		const singleData = await VendorModel.findByPk(id);
		if (!singleData) {
			return { status: false, message: "Vendor not found" };
		}
		await singleData.update(data);

		return { status: true, message: "Vendor updated successfully", singleData };
	} catch (error) {
		return {
			success: false,
			message: "Error updating package",
			error: error.message
		};
	}
};

configurationService.deleteVendor = async (id) => {
	try {
		const data = await VendorModel.findByPk(id);

		if (!data) { return { status: false, message: "Vendor not found" }; }

		await data.destroy();
		return { status: true, message: "Vendor deleted successfully" };
	} catch (error) {
		return {
			status: false,
			message: "Error deleting package",
			error: error.message
		};
	}
};

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
