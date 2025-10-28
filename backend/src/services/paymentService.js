import PaymentModel from "#models/payment";
import { PackageNotFoundError } from "#errors/package.errors";

const paymentService = {}

paymentService.process = async (userId, subscriptionId, paymentMethod = "card", amout) => {
	const newPayment = await PaymentModel.create(
		{
			user_id: userId,
			subscription_id: subscriptionId,
			transaction_id: "test",
			status: "pending",
			payment_method: paymentMethod,
			amount: parseFloat(amout),
		},
	);

	const isPaymentSuccessful = Math.random() > 0.2;

	if (!isPaymentSuccessful) {
		await newPayment.update({ status: "failed" });
		throw new PackageNotFoundError(subscriptionId, userId)
	}

	await newPayment.update({ status: "completed" });
}


export default paymentService
