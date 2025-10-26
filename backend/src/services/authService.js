import UserModel from "#models/user";
// import { sendMail } from "./mailService.js";
import subscriptionService from "#services/subscriptionService";
import { sequelize } from "#utils/db"
import { Op } from "sequelize";

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
			parant_id: payload.parant_id || 0,
			reset_flag: true
		}, { transaction }); // Pass transaction object

		const sub = await subscriptionService.create(newUser.id, payload.package_id, transaction);

		// sendMail(
		// 	insertData.username,
		// 	"Your Account Details",
		// 	"accountCreated",
		// 	{
		// 		username: insertData.username,
		// 		password: hashedPassword,
		// 	}
		// );

		await transaction.commit(); // Commit transaction if successful
		return { status: true, data: newUser, sub };
	} catch (error) {
		console.log(error.message)


		await transaction.rollback(); // Rollback transaction on error
		return {
			status: false,
			error: error.message
		};
	}
}


userService.getAll = async (page = 1, limit = 10, filters = {}) => {
	try {
		const offset = (page - 1) * limit;
		const whereClause = { ...filters }

		if (filters.name) {
			whereClause.name = { [Op.iLike]: `%${filters.name}%` };
		}
		const { count, rows } = await users.findAndCountAll({
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


export default userService
