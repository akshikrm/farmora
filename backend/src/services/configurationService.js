import { Op } from 'sequelize';
import SeasonModel from '#models/season';
import FarmModel from '#models/farm';
import ItemModel from '#models/item';
import VendorModel from '#models/vendor';
import BatchModel from '#models/batch';


const configurationService = {}

// season
configurationService.createSeason = async (insertData) => {
	try {
		const data = await SeasonModel.create(insertData);
		return { success: true, data };
	} catch (error) {
		return {
			success: false,
			error: error.message
		};
	}
};

configurationService.getAllSeasons = async (page = 1, limit = 10, filters = {}) => {
	try {
		const offset = (page - 1) * limit;
		const whereClause = { ...filters }

		if (filters.name) {
			whereClause.name = { [Op.iLike]: `%${filters.name}%` };
		}

		const { count, rows } = await SeasonModel.findAndCountAll({
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

configurationService.getSeasonById = async (id) => {
	try {
		const data = await SeasonModel.findOne({ where: { id } });
		return { status: true, data: data || [] };
	} catch (error) {
		return {
			success: false,
			message: "Error fetching package",
			error: error.message
		};
	}
};

configurationService.updateSeason = async (id, data) => {
	try {
		const singleData = await SeasonModel.findByPk(id);
		if (!singleData) {
			return { status: false, message: "Season not found" };
		}
		await singleData.update(data);

		return { status: true, message: "Season updated successfully", singleData };
	} catch (error) {
		return {
			success: false,
			message: "Error updating package",
			error: error.message
		};
	}
};

configurationService.deleteSeason = async (id) => {
	try {
		const data = await SeasonModel.findByPk(id);

		if (!data) { return { status: false, message: "Season not found" }; }

		await data.destroy();
		return { status: true, message: "Season deleted successfully" };
	} catch (error) {
		return {
			status: false,
			message: "Error deleting package",
			error: error.message
		};
	}
};

// Farm
configurationService.createFarm = async (insertData) => {
	try {
		const data = await FarmModel.create(insertData);
		return { success: true, data };
	} catch (error) {
		return {
			success: false,
			error: error.message
		};
	}
};

configurationService.getAllFarms = async (page = 1, limit = 10, filters = {}) => {
	try {
		const offset = (page - 1) * limit;
		const whereClause = { ...filters }

		if (filters.name) {
			whereClause.name = { [Op.iLike]: `%${filters.name}%` };
		}

		const { count, rows } = await FarmModel.findAndCountAll({
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

configurationService.getFarmById = async (id) => {
	try {
		const data = await FarmModel.findOne({ where: { id } });
		return { status: true, data: data || [] };
	} catch (error) {
		return {
			success: false,
			message: "Error fetching package",
			error: error.message
		};
	}
};

configurationService.updateFarm = async (id, data) => {
	try {
		const singleData = await FarmModel.findByPk(id);
		if (!singleData) {
			return { status: false, message: "Farm not found" };
		}
		await singleData.update(data);

		return { status: true, message: "Farm updated successfully", singleData };
	} catch (error) {
		return {
			success: false,
			message: "Error updating package",
			error: error.message
		};
	}
};

configurationService.deleteFarm = async (id) => {
	try {
		const data = await FarmModel.findByPk(id);

		if (!data) { return { status: false, message: "Farm not found" }; }

		await data.destroy();
		return { status: true, message: "Farm deleted successfully" };
	} catch (error) {
		return {
			status: false,
			message: "Error deleting package",
			error: error.message
		};
	}
};

// Item
configurationService.createItem = async (insertData) => {
	try {
		const data = await ItemModel.create(insertData);
		return { success: true, data };
	} catch (error) {
		return {
			success: false,
			error: error.message
		};
	}
};

configurationService.getAllItems = async (page = 1, limit = 10, filters = {}) => {
	try {
		const offset = (page - 1) * limit;
		const whereClause = { ...filters }

		if (filters.name) {
			whereClause.name = { [Op.iLike]: `%${filters.name}%` };
		}

		const { count, rows } = await ItemModel.findAndCountAll({
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

configurationService.getItemById = async (id) => {
	try {
		const data = await ItemModel.findOne({ where: { id } });
		return { status: true, data: data || [] };
	} catch (error) {
		return {
			success: false,
			message: "Error fetching package",
			error: error.message
		};
	}
};

configurationService.updateItem = async (id, data) => {
	try {
		const singleData = await ItemModel.findByPk(id);
		if (!singleData) {
			return { status: false, message: "Item not found" };
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

configurationService.deleteItem = async (id) => {
	try {
		const data = await ItemModel.findByPk(id);

		if (!data) { return { status: false, message: "Item not found" }; }

		await data.destroy();
		return { status: true, message: "Item deleted successfully" };
	} catch (error) {
		return {
			status: false,
			message: "Error deleting package",
			error: error.message
		};
	}
};

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
