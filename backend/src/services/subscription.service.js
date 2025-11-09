import SubscriptionModel from '#models/subscription';
import PackageModel from '#models/package';
import paymentService from '#services/payment.service';
import { SubsriptionAlreadyActiveError } from '#errors/subscription.errors';
import { PackageNotFoundError } from '#errors/package.errors';
import dayjs from 'dayjs';


const create = async (userID, packageID) => {
	const subscriptionRecord = await SubscriptionModel.findOne({
		where: { user_id: userID },
	},);

	if (subscriptionRecord) {
		throw new SubsriptionAlreadyActiveError(userID)
	}

	const packageRecord = await PackageModel.findByPk(packageID);
	if (!packageRecord) {
		throw new PackageNotFoundError(packageID)
	}

	const validFrom = new dayjs().toDate();
	const validTo = new dayjs().add(packageRecord.duration, 'month').toDate();


	const newSubscription = await SubscriptionModel.create(
		{
			user_id: userID,
			package_id: packageID,
			valid_from: validFrom,
			valid_to: validTo,
			status: "active",
		},
	);
	await paymentService.process(userID, newSubscription.id, "card", packageRecord.price,);
}

const getAll = async () => {
	const subscriptionRecords = await SubscriptionModel.findAll()
	return subscriptionRecords
}


const subscriptionService = {
	create,
	getAll,
}

export default subscriptionService
