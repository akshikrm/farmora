import Joi from "joi"

const packageSchema = Joi.object({
	name: Joi.string().min(3).max(100).required(),
	description: Joi.string().allow("").optional(),
	price: Joi.number().positive().required(),
	duration: Joi.number().integer().positive().required(), // Duration in days
	status: Joi.boolean().required()
});

const validatePackage = (req, res, next) => {
	const { error } = packageSchema.validate(req.body, { abortEarly: false });
	if (error) {
		return res.status(400).json({
			status: false,
			errors: error.details.map(err => err.message)
		});
	}

	next();
};


export default validatePackage
