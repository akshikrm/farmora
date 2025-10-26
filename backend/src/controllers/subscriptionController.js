import subscriptionService from "#services/subscriptionService";

const subscriptionController = {}

subscriptionController.createPackage = async (req, res) => {
	try {
		const payload = req.body;
		const newPackage = await subscriptionService.createPackage(payload);

		return res.status(201).json(newPackage);
	} catch (error) {
		console.log(error)
		const errObj = {
			message: "something went wrong",
			name: "ServerError",
			code: "INTERNAL_SERVER_ERROR"
		}
		res.status(500).json(errObj);

	}
};

subscriptionController.getAllPackages = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const whereClause = {}

		if (req.query.status) {
			whereClause.status = req.query.status
		}
		if (req.query.name) {
			whereClause.name = req.query.name;
		}

		const result = await subscriptionService.getAllPackages(
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

subscriptionController.getPackageById = async (req, res) => {
	try {
		console.log('id', req.params.id);

		const { id } = req.params;

		const result = await subscriptionService.getPackageById(id);

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};

subscriptionController.updatePackage = async (req, res) => {
	try {
		const { id } = req.params;
		const packageData = req.body;

		const result = await subscriptionService.updatePackage(id, packageData);

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

subscriptionController.deletePackage = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await subscriptionService.deletePackage(id);

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

subscriptionController.createSubscription = async (req, res) => {
	try {
		const { id } = req.body;
		const user_id = req.user.id;

		const result = await subscriptionService.create(user_id, id);

		if (!result.status) {
			return res.status(400).json({
				status: result.status,
				message: result.message
			});
		}

		return res.status(201).json({
			status: result.status,
			message: result.message,
			subscription: result.subscription
		});
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error", error: error.message });
	}
};


subscriptionController.listSubscription = async (req, res) => {
	try {
		console.log("test")
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
}


export default subscriptionController

