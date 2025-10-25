// import joi from "joi";
import users from "#models/user"

// const { object, string, required, number } = joi

// const userSchema = object({
// 	name: string().min(3).max(100).required(),
// 	username: string().min(3).max(100).required(),
// 	user_type: required(),
// 	status: number().integer().required(),
// 	parant_id: number().integer().required(),
// 	package_id: number().integer().optional()
// });

const validateUser = async (req, res, next) => {
	// const { error } = userSchema.validate(req.body, { abortEarly: false });
	// if (error) {
	// 	return res.status(400).json({
	// 		status: false,
	// 		errors: error.details.map(err => err.message)
	// 	});
	// }

	const existingUser = await users.findOne({ where: { username: req.body.username } });


	if (existingUser) {
		return res.status(400).json({
			status: false,
			errors: ["Username already exists. Please choose a different username."]
		});
	}

	next();
};

export default validateUser;
