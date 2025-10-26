import PaymentModel from "#models/payment";
import { v4 as uuidv4 } from "uuid";

const paymentService = {}

paymentService.process = async (userId, subscriptionId, amount, paymentMethod, transaction) => {
	try {
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

		if (isPaymentSuccessful) {
			await newPayment.update({ status: "completed" }, { transaction });
			return { status: true, message: "Payment successful", payment: newPayment };
		} else {
			await newPayment.update({ status: "failed" }, { transaction });
			return { status: false, message: "Payment failed", error: "Transaction declined" };
		}
	} catch (error) {
		return { status: false, message: "Payment processing error", error: error.message };
	}
}


export default paymentService
