const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient("mongodb://root:root@localhost:27017");

exports.clearDb = function () {
	client.connect(function (err) {
		let db = client.db("fake_news");
		let collection = db.collection("fakes");

		collection.remove({});
	}, function (err, ressult) {
		client.close();
	});
};

exports.insert = function (data) {
	client.connect(function (err) {
		let db = client.db("fake_news");
		let collection = db.collection("fakes");

		collection.insert(data, function (err, result) {
			client.close();
		});
	});
};