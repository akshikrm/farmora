import users from "#models/user"
import subscriptions from "#models/subscriptions"
import { Op } from 'sequelize';
import { generateToken } from '#utils/jwt';
import userService from "#services/authService";

const userController = {}

userController.signup = async (req, res) => {
	try {
		const user = await userService.create(req.body)
		// const user = await users.create({ name, email, password });
		// console.log('user', user);
		if (user.status) {
			const token = generateToken(user.data);
			res.status(201).json({
				status: true,
				message: 'User created',
				token
			});
		} else {
			res.status(500).json({
				status: false,
				message: "user created"
			});
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

userController.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await users.findOne({ where: { username } });
		if (!user)
			return res.status(404).json({
				status: false,
				error: 'User not found'
			});

		const isPasswordValid = await user.comparePassword(password);
		if (!isPasswordValid)
			return res.status(401).json({
				status: false,
				error: 'Invalid credentials'
			});

		const token = generateToken(user);
		const date = new Date().toISOString();

		user.last_login = date;
		user.save();
		if (user.user_type == 1) {
			res.json({
				status: true,
				token,
				master_id: user.id,
				name: user.name,
				username: user.username,
				user_type: user.usertype,
				parant_id: user.parant_id
			});
		} else {
			const checkSub = await subscriptions.findOne({ where: { status: 'active' } })
			if (checkSub) {
				res.json({
					status: true,
					token,
					master_id: user.id,
					name: user.name,
					username: user.username,
					user_type: user.usertype,
					parant_id: user.parant_id
				});
			} else {
				res.json({
					status: false,
					error: 'Sorry, your subscription is inactive. Please renew to continue.'
				});
			}
		}
	} catch (error) {
		res.status(500).json({
			status: false,
			error: error.message
		});
	}
}

userController.getAllUsers = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const whereClause = { status: { [Op.ne]: 0 } }

		if (req.query.status) {
			whereClause.status = req.query.status
		}

		if (req.query.parant_id) {
			whereClause.parant_id = req.query.parant_id
		}

		const result = await userService.getAll(
			page, limit, whereClause
		);

		if (!result.success) {
			return res.status(500).json({
				message: result.message,
				error: result.error
			});
		}

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({
			status: false,
			error: error.message
		});
	}
}

export default userController
