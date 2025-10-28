import subscriptionService from "#services/subscriptionService";

const subscriptionController = {}

subscriptionController.create = async (req, res) => {
	const { package_id } = req.body;
	const userID = req.user.id;
	const newSubscription = await subscriptionService.create(userID, package_id);
	res.success(newSubscription, { message: "Subscription created", statusCode: 201 })
};

subscriptionController.getUserSubscriptions = async (req, res) => {
	try {
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message
		});
	}
}


export default subscriptionController

