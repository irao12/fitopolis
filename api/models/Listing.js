"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Listing extends Model {}

	Listing.init(
		{
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
			description: {
				type: DataTypes.TEXT("long"),
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
			images: {
				type: DataTypes.ARRAY(DataTypes.STRING), // <- type for image ( database :postgresql )
				allowNull: false,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
			},
		},
		{
			sequelize,
			modelName: "Listing",
		}
	);

	Listing.associate = (models) => {
		// associations can be defined here
	};

	return Listing;
};
