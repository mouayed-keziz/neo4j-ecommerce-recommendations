const Order = require("../models/orderModel");
const User = require("../models/userModel");

const get_all_orders = async (req, res) => {
	Order.getAll()
		.then((orders) => {
			res.send(orders.map((order) => order.properties));
		})
		.catch((error) => {
			res.status(500).send({ message: "Orders not found" });
		});
};

const get_order_by_id = async (req, res) => {
	Order.getOne(req.params.id)
		.then((order) => {
			res.send(order.properties);
		})
		.catch((error) => {
			res.status(500).send({ message: "product not found" });
		});
}

const create_order = async (req, res) => {
	const { userId } = req.body;
	console.table({ userId });
	const order = new Order(userId);
	order.save(userId).then((result) => {
		res.send(result);
	}).catch((error) => {
		res.status(500).send({ message: "Error creating order" });
	});
}

const rate_product = async (req, res) => {
	const { userId, productId, rating } = req.body;
	Order.rate(userId, productId, rating).then((result) => {
		res.send(result);
	}).catch((error) => {
		res.status(500).send({ message: "Error rating product" });
	});
}

const gen_recommendations = async (req, res) => {
	try {
		const userId = req.body.userId;
		Order.generateRecommendations(userId).then((result) => {
			res.send(result);
		}).catch((error) => {
			res.status(500).send({ message: "Error generating recommendations" });
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
}

module.exports = {
	get_all_orders,
	get_order_by_id,
	create_order,
	rate_product,
	gen_recommendations
}