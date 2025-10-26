import PaymentModel from "#models/payment";
import { v4 as uuidv4 } from "uuid";

const paymentService = {}

paymentService.process = async (userId, subscriptionId, amount, paymentMethod, transaction) => {
	const transactionId = uuidv4();
	const newPayment = await PaymentModel.create(
		{
			user_id: userId,
			subscription_id: subscriptionId,
			amount,
			payment_method: paymentMethod,
			transaction_id: transactionId,
			status: "pending",
		},
		{ transaction }
	);

	const isPaymentSuccessful = Math.random() > 0.2;

	if (!isPaymentSuccessful) {
		await newPayment.update({ status: "failed" }, { transaction });
		throw new Error(`payment failed for subscription_id ${subscriptionId} for user ${userId}`)
	}

	await newPayment.update({ status: "completed" }, { transaction });
}


export default paymentService
