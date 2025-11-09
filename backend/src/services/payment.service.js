import PaymentModel from "#models/payment";
import { PackageNotFoundError } from "#errors/package.errors";
import { v4 as UUIDV4 } from "uuid";

const paymentService = {}

paymentService.process = async (userId, subscriptionId, paymentMethod = "card", amout) => {
	const uuid = UUIDV4();
	const newPayment = await PaymentModel.create(
		{
			user_id: userId,
			subscription_id: subscriptionId,
			transaction_id: uuid,
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
