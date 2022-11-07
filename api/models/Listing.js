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
			quantity: {
				type: DataTypes.INTEGER,
				validate: {
					min: 1,
					isNumeric: true,
				},
			},
			// images: {
			// 	type: DataTypes.ARRAY(DataTypes.BLOB("long")), // <- type for image ( database :postgresql )
			// 	allowNull: false,
			// },
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
