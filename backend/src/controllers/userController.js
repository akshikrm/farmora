const { User } = require('../../models').default;




// Get all users
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();
		res.json(users);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

// Create a new user
exports.createUser = async (req, res) => {
	const { name, email } = req.body;
	try {
		const user = await User.create({ name, email });
		res.status(201).json(user);
	} catch (error) {
		res.status(500).send(error.message);
	}
};
