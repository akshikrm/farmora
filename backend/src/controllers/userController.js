import user from '#models/user'


const userController = {}

// Get all users
userController.getAllUsers = async (_, res) => {
	try {
		const users = await user.findAll();
		res.json(users);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

// Create a new user
userController.createUser = async (req, res) => {
	const { name, email } = req.body;
	try {
		const user = await user.create({ name, email });
		res.status(201).json(user);
	} catch (error) {
		res.status(500).send(error.message);
	}
};


export default userController
