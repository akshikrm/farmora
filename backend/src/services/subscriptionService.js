import { Op } from 'sequelize';
import SubscriptionModel from '#models/subscription';
import PackageModel from '#models/package';
import paymentService from '#services/paymentService';
import { SubsriptionAlreadyActiveError } from '#errors/subscription.errors';
import { PackageNotFoundError } from '#errors/package.errors';


const subscriptionService = {}


subscriptionService.createPackage = async (insertData) => {
	const data = await PackageModel.create(insertData);
	return data
}

subscriptionService.getAllPackages = async (page = 1, limit = 10, filters = {}) => {
	try {
		const offset = (page - 1) * limit;
		const whereClause = { ...filters }

		if (filters.name) {
			whereClause.name = { [Op.iLike]: `%${filters.name}%` };
		}
		const { count, rows } = await PackageModel.findAndCountAll({
			where: whereClause,
			limit, offset,
			order: [["id", "DESC"]]
		});

		return {
			success: true, total: count, page, limit,
			totalPages: Math.ceil(count / limit),
			data: rows,
		};
	} catch (error) {
		return {
			success: false,
			message: "Error fetching packages",
			error: error.message
		};
	}
}

subscriptionService.getPackageById = async (id) => {
	try {
		const data = await PackageModel.findOne({ where: { id } });
		return { status: true, data: data || [] };
	} catch (error) {
		return {
			success: false,
			message: "Error fetching package",
			error: error.message
		};
	}
}

subscriptionService.updatePackage = async (id, data) => {
	try {
		const singleData = await PackageModel.findByPk(id);
		if (!singleData) {
			return { status: false, message: "Package not found" };
		}
		await singleData.update(data);

		return { status: true, message: "Package updated successfully", singleData };
	} catch (error) {
		return {
			success: false,
			message: "Error updating package",
			error: error.message
		};
	}
}

subscriptionService.deletePackage = async (id) => {
	try {
		const data = await PackageModel.findByPk(id);

		if (!data) { return { status: false, message: "Package not found" }; }

		await data.destroy();
		return { status: true, message: "Package deleted successfully" };
	} catch (error) {
		return {
			status: false,
			message: "Error deleting package",
			error: error.message
		};
	}
}

subscriptionService.create = async (userId, packageId, transaction) => {
	const subscriptionRecord = await SubscriptionModel.findOne({
		where: { user_id: userId, status: "active" },
		transaction,
	});

	if (subscriptionRecord) {
		throw new SubsriptionAlreadyActiveError(userId)
	}

	const packageRecord = await PackageModel.findByPk(packageId, { transaction });
	if (!packageRecord) {
		throw new PackageNotFoundError(packageId)
	}

	const startDate = new Date();
	const endDate = new Date();
	endDate.setDate(startDate.getDate() + packageRecord.duration);

	const newSubscription = await SubscriptionModel.create(
		{
			user_id: userId,
			package_id: packageId,
			start_date: startDate,
			end_date: endDate,
			status: "active",
		},
		{ transaction }
	);

	await paymentService.process(
		userId, newSubscription.id, packageRecord.price, "card", transaction
	);
}


export default subscriptionService
