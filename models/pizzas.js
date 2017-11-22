const orm = require('../config/orm');

const pizza = {
	selectAll: function (callback) {
		orm.selectAll(function (resultsObject) {
			callback(resultsObject);
		});
	},
	insertOne: function (insertObj, callback) {
		orm.insertOne(insertObj, function (resultsObject) {
			callback(resultsObject);
		});
	},
	updateOne: function (devouredUpdate, callback) {
		orm.updateOne(devouredUpdate, function (resultsObject) {
			callback(resultsObject);
		});
	}
}

module.exports = pizza;