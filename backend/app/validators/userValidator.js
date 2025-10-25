const Joi = require("joi");
const { users } = require("../../models")

const userSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    username : Joi.string().min(3).max(100).required(),
    user_type : Joi.required(),
    status: Joi.number().integer().required(),
    parant_id: Joi.number().integer().required(),
    package_id: Joi.number().integer().optional()
});

const validateUser = async (req, res, next) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ 
            status: false,
            errors: error.details.map(err => err.message) 
        });
    }

    // Check if username already exists
    const existingUser = await users.findOne({ where:{ username: req.body.username } });

    console.log('req.body.username', req.body.username);
    
    if (existingUser) {
        return res.status(400).json({ 
            status: false,
            errors: ["Username already exists. Please choose a different username."] 
        });
    }

    next();
};

module.exports = { validateUser };
