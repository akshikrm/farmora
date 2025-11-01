import { Op } from 'sequelize';
import PackageModel from '#models/package';
import { PackageNotFoundError } from '#errors/package.errors';

const packageService = {}

packageService.create = async (insertData) => {
	return await PackageModel.create(insertData);
}

packageService.getAll = async (payload) => {
	const { limit, page, ...filter } = payload
	const offset = (page - 1) * limit;

	if (filter.name) {
		filter.name = { [Op.iLike]: `%${filter.name}%` };
	}

	const { count, rows } = await PackageModel.findAndCountAll({
		where: filter,
		limit, offset,
		order: [["id", "DESC"]]
	});

	return {
		page,
		limit,
		total: count,
		data: rows,
	}
}

packageService.getById = async (id) => {
	const packageRecord = await PackageModel.findOne({ where: { id } });
	if (!packageRecord) {
		throw new PackageNotFoundError(id)
	}
	return packageRecord;
}

packageService.update = async (id, data) => {
	const packageRecord = await packageService.getById(id);
	await packageRecord.update(data);
}

packageService.delete = async (id) => {
	const packageRecord = await packageService.getById(id);
	await packageRecord.destroy();
}


// subscriptionService.create = async (userId, packageId, transaction) => {
// 	const subscriptionRecord = await SubscriptionModel.findOne({
// 		where: { user_id: userId, status: "active" },
// 		transaction,
// 	});
//
// 	if (subscriptionRecord) {
// 		throw new SubsriptionAlreadyActiveError(userId)
// 	}
//
// 	const packageRecord = await PackageModel.findByPk(packageId, { transaction });
// 	if (!packageRecord) {
// 		throw new PackageNotFoundError(packageId)
// 	}
//
// 	const startDate = new Date();
// 	const endDate = new Date();
// 	endDate.setDate(startDate.getDate() + packageRecord.duration);
//
// 	const newSubscription = await SubscriptionModel.create(
// 		{
// 			user_id: userId,
// 			package_id: packageId,
// 			start_date: startDate,
// 			end_date: endDate,
// 			status: "active",
// 		},
// 		{ transaction }
// 	);
//
// 	await paymentService.process(
// 		userId, newSubscription.id, packageRecord.price, "card", transaction
// 	);


// }


export default packageService
