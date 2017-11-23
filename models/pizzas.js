module.exports = function (sequelize, DataTypes) {
	let Pizza = sequelize.define("pizza", {
		pizza_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		devoured: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [1]
			}
		}
	})
	return Pizza;
};