import SubscriptionModel from '#models/subscription';
import PackageModel from '#models/package';
import paymentService from '#services/paymentService';
import { SubsriptionAlreadyActiveError } from '#errors/subscription.errors';
import { PackageNotFoundError } from '#errors/package.errors';

const subscriptionService = {}

subscriptionService.create = async (userID, packageID) => {
	const subscriptionRecord = await SubscriptionModel.findOne({
		where: { user_id: userID, status: "active" },
	},);

	if (subscriptionRecord) {
		throw new SubsriptionAlreadyActiveError(userID)
	}

	const packageRecord = await PackageModel.findByPk(packageID);
	if (!packageRecord) {
		throw new PackageNotFoundError(packageID)
	}

	const startDate = new Date();
	const endDate = new Date();
	endDate.setDate(startDate.getDate() + packageRecord.duration);

	const newSubscription = await SubscriptionModel.create(
		{
			user_id: userID,
			package_id: packageID,
			start_date: startDate,
			end_date: endDate,
			status: "active",
		},
	);
	await paymentService.process(userID, newSubscription.id, "card", packageRecord.price,);
}


export default subscriptionService
