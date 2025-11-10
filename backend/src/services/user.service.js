import { UserNotFoundError } from "#errors/user.errors";
import SubscriptionModel from "#models/subscription";
import UserModel from "#models/user";
// import { sendMail } from "./mailService.js";
import { sequelize } from "#utils/db"
import { Op } from "sequelize";
// import subscriptionService from "#services/subscription.service";
import userRoles from "#utils/user-roles";

const userService = {}

userService.createStaff = async (payload) => {
	const transaction = await sequelize.transaction();
	try {

		const newUser = await UserModel.create({
			name: payload.name,
			username: payload.username,
			password: payload.password,
			user_type: userRoles.staff.type,
			status: payload.status,
			parent_id: payload.parentId,
		}, { transaction });

		// await subscriptionService.create(newUser.id, payload.package_id, transaction);

		// sendMail(
		// 	insertData.username,
		// 	"Your Account Details",
		// 	"accountCreated",
		// 	{
		// 		username: insertData.username,
		// 		password: hashedPassword,
		// 	}
		// );

		await transaction.commit();
		return newUser
	} catch (error) {
		await transaction.rollback();
		throw error
	}
}

userService.getById = async (userID) => {
	const userRecord = await UserModel.findByPk(userID, {
		attributes: {
			exclude: ["password"]
		}
	});
	if (!userRecord) {
		throw new UserNotFoundError(userID)
	}
	return userRecord
}


userService.update = async (userId, payload) => {
	const userRecord = await userService.getById(userId);
	await userRecord.update(payload);
}

userService.delete = async (userId) => {
	const userRecord = await userService.getById(userId);
	await userRecord.destroy();
}


userService.getAll = async (payload = {}) => {
	const { limit, page, ...filter } = payload
	const offset = (page - 1) * limit;

	if (filter.name) {
		filter.name = { [Op.iLike]: `%${filter.name}%` };
	}

	const { count, rows } = await UserModel.findAndCountAll({
		include: {
			model: SubscriptionModel,
			as: 'subscriptions'
		},
		where: filter,
		limit, offset,
		order: [["id", "DESC"]],
		attributes: {
			exclude: ["password"]
		}
	});

	return {
		page,
		limit,
		total: count,
		data: rows,
	};
}


export default userService
