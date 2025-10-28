import { SubsriptionInActiveError } from "#errors/subscription.errors";
import { InvalidCredentialError, InvalidUsernameError, UserNotFoundError } from "#errors/user.errors";
import SubscriptionModel from "#models/subscription";
import UserModel from "#models/user";
// import { sendMail } from "./mailService.js";
import { sequelize } from "#utils/db"
import { Op } from "sequelize";
import subscriptionService from "#services/subscriptionService";

const userService = {}

userService.create = async (payload) => {
	const transaction = await sequelize.transaction();
	try {
		const hashedPassword = 'login@123';

		const newUser = await UserModel.create({
			name: payload.name,
			username: payload.username,
			password: hashedPassword,
			user_type: payload.user_type,
			status: payload.status,
			parent_id: payload.parent_id || 0,
			reset_flag: true
		}, { transaction });

		await subscriptionService.create(newUser.id, payload.package_id, transaction);

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


userService.login = async (username, password) => {
	if (!username) {
		throw new InvalidUsernameError(username)
	}

	const user = await UserModel.findOne({ where: { username } });
	if (!user) {
		throw new UserNotFoundError(username)
	}

	const passwordVerified = await user.comparePassword(password);
	if (!passwordVerified) {
		throw new InvalidCredentialError(username)
	}

	if (user.user_type !== 1) {
		const activeSubscription = await SubscriptionModel.findOne({ where: { status: 'active' } })
		if (!activeSubscription) {
			throw new SubsriptionInActiveError(user.id)
		}
	}

	const date = new Date().toISOString();
	user.last_login = date;
	user.save();

	return user
}

userService.getAll = async (payload = {}) => {
	const { limit, page, ...filter } = payload
	const offset = (page - 1) * limit;

	if (filter.name) {
		filter.name = { [Op.iLike]: `%${filter.name}%` };
	}

	const { count, rows } = await UserModel.findAndCountAll({
		where: filter,
		limit, offset,
		order: [["id", "DESC"]]
	});

	return {
		page,
		limit,
		total: count,
		data: rows,
	};
}


export default userService
