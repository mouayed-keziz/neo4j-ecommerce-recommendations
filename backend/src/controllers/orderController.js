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
	const order = new Order(userId);
	order.save(userId).then((result) => {
		res.send(result);
	}).catch((error) => {
		res.status(500).send({ message: "Error creating order" });
	});
}

module.exports = {
	get_all_orders,
	get_order_by_id,
	create_order
}