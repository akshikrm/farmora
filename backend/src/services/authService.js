import users from "#models/user"
import { sendMail } from "./mailService.js";
import { createSubscription } from "#services/subscriptionService";
import { sequelize } from "#utils/db"

const userService = {}

userService.create = async (insertData) => {
	const transaction = await sequelize.transaction();
	try {
		const hashedPassword = 'login@123';

		const data = await users.create({
			name: insertData.name,
			username: insertData.username,
			password: hashedPassword,
			user_type: insertData.user_type,
			status: insertData.status,
			parant_id: insertData.parant_id || 0,
			reset_flag: true
		}, { transaction }); // Pass transaction object

		const sub = await createSubscription(data.id, insertData.package_id, transaction);

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
		return { status: true, data, sub };
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
