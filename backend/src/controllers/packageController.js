import packageService from "#services/packageService";

const packageController = {}

packageController.create = async (req, res) => {
	const payload = req.body;
	const newPackage = await packageService.create(payload);
	res.success(newPackage, { message: "package created" })
};

packageController.getAll = async (req, res) => {
	const filter = {
		page: parseInt(req.query.page) || 1,
		limit: parseInt(req.query.limit) || 10,
	}

	if (req.query.status) { filter.status = parseInt(req.query.status) }
	if (req.query.name) { filter.name = req.query.name }

	const subscriptionRecords = await packageService.getAll(filter);
	res.success(subscriptionRecords, { message: "packages list" })
};

packageController.getById = async (req, res) => {
	const { package_id } = req.params;
	const subscriptionRecord = await packageService.getById(package_id);
	res.success(subscriptionRecord, { message: "package details" })
};

packageController.update = async (req, res) => {
	const { package_id } = req.params;
	const payload = req.body;

	await packageService.update(package_id, payload);
	res.success(null, { message: "package updated" })
};

packageController.deletePackage = async (req, res) => {
	const { package_id } = req.params;
	await packageService.delete(package_id);
	res.success(null, { message: "package deleted" })
};

// subscriptionController.createSubscription = async (req, res) => {
// 	try {
// 		const { id } = req.body;
// 		const user_id = req.user.id;
//
// 		const result = await packageService.create(user_id, id);
//
// 		if (!result.status) {
// 			return res.status(400).json({
// 				status: result.status,
// 				message: result.message
// 			});
// 		}
//
// 		return res.status(201).json({
// 			status: result.status,
// 			message: result.message,
// 			subscription: result.subscription
// 		});
// 	} catch (error) {
// 		return res.status(500).json({ message: "Internal Server Error", error: error.message });
// 	}
// };


// subscriptionController.listSubscription = async (req, res) => {
// 	try {
// 		console.log("test")
// 	} catch (error) {
// 		return res.status(500).json({
// 			message: "Internal Server Error",
// 			error: error.message
// 		});
// 	}
// }


export default packageController

