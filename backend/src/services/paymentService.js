import PaymentModel from "#models/payment";
import { v4 as uuidv4 } from "uuid";

export async function processPayment(userId, subscriptionId, amount, paymentMethod, transaction) {
	try {
		const transactionId = uuidv4();

		const payment = await PaymentModel.create(
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

		if (isPaymentSuccessful) {
			await payment.update({ status: "completed" }, { transaction });
			return { status: true, message: "Payment successful", payment };
		} else {
			await payment.update({ status: "failed" }, { transaction });
			return { status: false, message: "Payment failed", error: "Transaction declined" };
		}
	} catch (error) {
		return { status: false, message: "Payment processing error", error: error.message };
	}
}
