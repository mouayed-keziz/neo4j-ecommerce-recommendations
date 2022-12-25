
const {
	get_all_orders,
	get_order_by_id,
	create_order,
} = require("../controllers/orderController");

const order_router = require("express").Router();


order_router.get("/", get_all_orders);

order_router.get("/:id", get_order_by_id);

order_router.post("/", create_order);


module.exports = order_router;
