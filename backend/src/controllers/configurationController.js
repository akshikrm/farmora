import configurationService from "#services/configurationService";

const configurationController = {}


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
