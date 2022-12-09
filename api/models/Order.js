"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Order extends Model {}

	Order.init(
		{
			orderID: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
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

			//Order history will not display address.
			address: {
				type: DataTypes.STRING,
			},
			tracking: {
				type: DataTypes.STRING,
			},

			completed: {
				type: DataTypes.BOOLEAN,	
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
