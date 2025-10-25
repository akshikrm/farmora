const { payments } = require("../../models");
const { v4: uuidv4 } = require("uuid");

exports.processPayment = async (userId, subscriptionId, amount, paymentMethod, transaction) => {
    try {
        const transactionId = uuidv4();

        const payment = await payments.create(
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
};
