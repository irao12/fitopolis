"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Order extends Model {}

	Order.init(
		{
			orderID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			sellerID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			buyerID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			orderDetails: {
				type: DataTypes.JSON,
			},
		},
		{
			sequelize,
			modelName: "order",
		}
	);

	Order.associate = (models) => {
		// associations can be defined here
	};

	return Order;
};
