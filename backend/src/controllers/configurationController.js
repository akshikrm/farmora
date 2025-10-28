import configurationService from "#services/configurationService";

const configurationController = {}

// Farm
configurationController.createFarm = async (req, res) => {
	try {
		const data = req.body;
		const result = await configurationService.createFarm(data);

		if (!result.success) {
			return res.status(500).json({
				status: false,
				message: "Failed to create season",
				error: result.error
			});
		}

		return res.status(201).json({
			status: true,
			message: "Farm created successfully",
			package: result.data
		});

	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
};

configurationController.getAllFarms = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const whereClause = {}

		if (req.query.master_id) {
			whereClause.master_id = req.query.master_id
		}
		if (req.query.status) {
			whereClause.status = req.query.status
		}
		if (req.query.name) {
			whereClause.name = req.query.name;
		}

		const result = await configurationService.getAllFarms(
			page, limit, whereClause
		);

		if (!result.success) {
			return res.status(500).json({
				message: result.message,
				error: result.error
			});
		}

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
};

configurationController.getFarmById = async (req, res) => {
	try {

		const { id } = req.params;

		const result = await configurationService.getFarmById(id);

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

configurationController.updateFarm = async (req, res) => {
	try {
		const { id } = req.params;
		const data = req.body;

		const result = await configurationService.updateFarm(id, data);

		if (!result.status) {
			return res.status(400).json({
				status: false,
				message: result.message
			});
		}

		return res.status(200).json({
			status: false,
			message: result.message,
			data: result.singleData
		});
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

configurationController.deleteFarm = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await configurationService.deleteFarm(id);

		if (!result.status) {
			return res.status(404).json({
				status: false,
				message: result.message
			});
		}

		return res.status(200).json({
			status: true,
			message: result.message
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
};

// Item
configurationController.createItem = async (req, res) => {
	try {
		const data = req.body;
		const result = await configurationService.createItem(data);

		if (!result.success) {
			return res.status(500).json({
				status: false,
				message: "Failed to create season",
				error: result.error
			});
		}

		return res.status(201).json({
			status: true,
			message: "Items created successfully",
			package: result.data
		});

	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
};

configurationController.getAllItems = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const whereClause = {}

		if (req.query.master_id) {
			whereClause.master_id = req.query.master_id
		}
		if (req.query.status) {
			whereClause.status = req.query.status
		}
		if (req.query.name) {
			whereClause.name = req.query.name;
		}

		const result = await configurationService.getAllItems(
			page, limit, whereClause
		);

		if (!result.success) {
			return res.status(500).json({
				message: result.message,
				error: result.error
			});
		}

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
};

configurationController.getItemById = async (req, res) => {
	try {

		const { id } = req.params;

		const result = await configurationService.getItemById(id);

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

configurationController.updateItem = async (req, res) => {
	try {
		const { id } = req.params;
		const data = req.body;

		const result = await configurationService.updateItem(id, data);

		if (!result.status) {
			return res.status(400).json({
				status: false,
				message: result.message
			});
		}

		return res.status(200).json({
			status: false,
			message: result.message,
			data: result.singleData
		});
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

configurationController.deleteItem = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await configurationService.deleteItem(id);

		if (!result.status) {
			return res.status(404).json({
				status: false,
				message: result.message
			});
		}

		return res.status(200).json({
			status: true,
			message: result.message
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
};

// Vendor
configurationController.createVendor = async (req, res) => {
	try {
		const data = req.body;
		const result = await configurationService.createVendor(data);

		if (!result.success) {
			return res.status(500).json({
				status: false,
				message: "Failed to create season",
				error: result.error
			});
		}

		return res.status(201).json({
			status: true,
			message: "Vendor created successfully",
			package: result.data
		});

	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
};

configurationController.getAllVendor = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const whereClause = {}

		if (req.query.master_id) {
			whereClause.master_id = req.query.master_id
		}
		if (req.query.status) {
			whereClause.status = req.query.status
		}
		if (req.query.name) {
			whereClause.name = req.query.name;
		}

		const result = await configurationService.getAllVendors(
			page, limit, whereClause
		);

		if (!result.success) {
			return res.status(500).json({
				message: result.message,
				error: result.error
			});
		}

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
};

configurationController.getVendorById = async (req, res) => {
	try {

		const { id } = req.params;

		const result = await configurationService.getVendorById(id);

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

configurationController.updateVendor = async (req, res) => {
	try {
		const { id } = req.params;
		const data = req.body;

		const result = await configurationService.updateVendor(id, data);

		if (!result.status) {
			return res.status(400).json({
				status: false,
				message: result.message
			});
		}

		return res.status(200).json({
			status: false,
			message: result.message,
			data: result.singleData
		});
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

configurationController.deleteVendor = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await configurationService.deleteVendor(id);

		if (!result.status) {
			return res.status(404).json({
				status: false,
				message: result.message
			});
		}

		return res.status(200).json({
			status: true,
			message: result.message
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
};

// Farm
configurationController.createBatch = async (req, res) => {
	try {
		const data = req.body;
		const result = await configurationService.createBatch(data);

		if (!result.success) {
			return res.status(500).json({
				status: false,
				message: "Failed to create batch",
				error: result.error
			});
		}

		return res.status(201).json({
			status: true,
			message: "Batch created successfully",
			package: result.data
		});

	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
};

configurationController.getAllBatchs = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const whereClause = {}

		if (req.query.season_id) {
			whereClause.season_id = req.query.season_id
		}
		if (req.query.farm_id) {
			whereClause.farm_id = req.query.farm_id
		}
		if (req.query.status) {
			whereClause.status = req.query.status
		}

		const result = await configurationService.getAllBatchs(
			page, limit, whereClause
		);

		if (!result.success) {
			return res.status(500).json({
				message: result.message,
				error: result.error
			});
		}

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
};

configurationController.getBatchById = async (req, res) => {
	try {

		const { id } = req.params;

		const result = await configurationService.getBatchById(id);

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

configurationController.updateBatch = async (req, res) => {
	try {
		const { id } = req.params;
		const data = req.body;

		const result = await configurationService.updateBatch(id, data);

		if (!result.status) {
			return res.status(400).json({
				status: false,
				message: result.message
			});
		}

		return res.status(200).json({
			status: false,
			message: result.message,
			data: result.singleData
		});
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

configurationController.deleteBatch = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await configurationService.deleteBatch(id);

		if (!result.status) {
			return res.status(404).json({
				status: false,
				message: result.message
			});
		}

		return res.status(200).json({
			status: true,
			message: result.message
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
};


export default configurationController
