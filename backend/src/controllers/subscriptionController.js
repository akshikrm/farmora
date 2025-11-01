import subscriptionService from "#services/subscriptionService";

const subscriptionController = {}

subscriptionController.create = async (req, res) => {
	const { package_id } = req.body;
	const userID = req.user.id;
	const newSubscription = await subscriptionService.create(userID, package_id);
	res.success(newSubscription, { message: "Subscription created", statusCode: 201 })
};

subscriptionController.getAll = async (_, res) => {
	const subscriptionRecords = await subscriptionService.getAll()
	res.success(subscriptionRecords, { message: "Subscription List" })
}


export default subscriptionController

