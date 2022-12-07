"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Order extends Model {}

	Order.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			sellerID: {
				type: DataTypes.INTEGER,
			},
			title: {
				type: DataTypes.STRING,
				validate: {
					len: [3, 250],
					notEmpty: true,
				},
			},
			price: {
				type: DataTypes.DECIMAL,
				validate: {
					isDecimal: true,
				},
			},
			shipping: {
				type: DataTypes.DECIMAL,
				validate: {
					isDecimal: true,
				},
			},
			quantity: {
				type: DataTypes.INTEGER,
				validate: {
					min: 1,
					isNumeric: true,
				},
			},
			condition: {
				type: DataTypes.STRING,
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
