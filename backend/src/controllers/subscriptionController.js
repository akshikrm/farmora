import { PackageNotFoundError } from "#errors/package.errors";
import { SubsriptionAlreadyActiveError } from "#errors/subscription.errors";
import subscriptionService from "#services/subscriptionService";

const subscriptionController = {}

subscriptionController.create = async (req, res) => {
	try {
		const { package_id } = req.body;
		const userID = req.user.id;
		const newSubscription = await subscriptionService.create(userID, package_id);
		res.success(newSubscription, { message: "Subscription created", statusCode: 201 })
	} catch (error) {
		if (error instanceof PackageNotFoundError) { error.statusCode = 404 }
		if (error instanceof SubsriptionAlreadyActiveError) { error.statusCode = 409 }
		throw error
	}
};

subscriptionController.getAll = async (_, res) => {
	const subscriptionRecords = await subscriptionService.getAll()
	res.success(subscriptionRecords, { message: "Subscription List" })
}


export default subscriptionController

