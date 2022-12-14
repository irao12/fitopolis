"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Listing extends Model {}

	Listing.init(
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
					min: 0,
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
			modelName: "listing",
		}
	);

	Listing.associate = (models) => {};

	return Listing;
};
