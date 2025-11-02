import subscriptionService from "#services/subscriptionService";
import asyncHandler from "#utils/async-handler";

const create = async (req, res) => {
	const { package_id } = req.body;
	const userID = req.user.id;
	const newSubscription = await subscriptionService.create(userID, package_id);
	res.success(newSubscription, { message: "Subscription created", statusCode: 201 })
};

const getAll = async (_, res) => {
	const subscriptionRecords = await subscriptionService.getAll()
	res.success(subscriptionRecords, { message: "Subscription List" })
}

const subscriptionController = {
	create: asyncHandler(create),
	getAll: asyncHandler(getAll),
};


export default subscriptionController

