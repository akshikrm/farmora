export default (sequelize, DataTypes) => {
	const Subscriptions = sequelize.define('payments',
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			subscription_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			amount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false
			},
			payment_method: {
				type: DataTypes.ENUM("card", "paypal", "bank_transfer"),
				allowNull: false
			},
			status: {
				type: DataTypes.ENUM("pending", "completed", "failed"),
				defaultValue: "pending"
			},
			transaction_id: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
		},
		{
			paranoid: true,
			timestamps: true,
		}
	);

	return Subscriptions;
};
