import { Op } from 'sequelize';
import subscriptions from '#models/subscriptions';
import packages from '#models/packages';
import { processPayment } from '#services/paymentService';
import { sequelize } from "#utils/db"

export async function createPackage(insertData) {
	try {
		const data = await packages.create(insertData);
		return { success: true, data };
	} catch (error) {
		return {
			success: false,
			error: error.message
		};
	}
}

export async function getAllPackages(page = 1, limit = 10, filters = {}) {
	try {
		const offset = (page - 1) * limit;
		const whereClause = { ...filters }

		if (filters.name) {
			whereClause.name = { [Op.iLike]: `%${filters.name}%` };
		}
		const { count, rows } = await packages.findAndCountAll({
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

export async function getPackageById(id) {
	try {
		const data = await packages.findOne({ where: { id } });
		return { status: true, data: data || [] };
	} catch (error) {
		return {
			success: false,
			message: "Error fetching package",
			error: error.message
		};
	}
}

export async function updatePackage(id, data) {
	try {
		const singleData = await packages.findByPk(id);
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

export async function deletePackage(id) {
	try {
		const data = await packages.findByPk(id);

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

export async function createSubscription(userId, packageId) {
	const transaction = await sequelize.transaction();
	try {
		const packageData = await packages.findByPk(packageId, { transaction });
		if (!packageData) {
			await transaction.rollback();
			return { status: false, message: "Package not found" };
		}

		const existingSubscription = await subscriptions.findOne({
			where: { user_id: userId, status: "active" },
			transaction,
		});

		if (existingSubscription) {
			await transaction.rollback();
			return { status: false, message: "User already has an active subscription" };
		}

		const startDate = new Date();
		const endDate = new Date();
		endDate.setDate(startDate.getDate() + packageData.duration);

		const subscription = await subscriptions.create(
			{
				user_id: userId,
				package_id: packageId,
				start_date: startDate,
				end_date: endDate,
				status: "active",
			},
			{ transaction }
		);

		const paymentResult = await processPayment(
			userId, subscription.id, packageData.price, "cash", transaction
		);

		if (!paymentResult.status) {
			await transaction.rollback();
			return { status: false, message: "Payment failed", error: paymentResult.error };
		}

		await transaction.commit();
		return { status: true, message: "Subscription created successfully", subscription };
	} catch (error) {
		console.error(error);

		await transaction.rollback();
		return { status: false, message: "Error creating subscription", error: error.message };
	}
}
