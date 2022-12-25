const { RunQuery } = require("../db_connect");
/*
class Order {
	constructor() {
		this.table = "orders";
	}

	async createOrder(order) {
		const query = `INSERT INTO ${this.table} (user_id, order_date, total_price, order_status) VALUES ($1, $2, $3, $4) RETURNING *`;
		const values = [
			order.user_id,
			order.order_date,
			order.total_price,
			order.order_status
		];
		const result = await RunQuery(query, values);
		return result;
	}

	async getOrders() {
		const query = `SELECT * FROM ${this.table}`;
		const result = await RunQuery(query);
		return result;
	}

	async getOrderById(id) {
		const query = `SELECT * FROM ${this.table} WHERE id = $1`;
		const result = await RunQuery(query, [id]);
		return result;
	}
}
*/


class Order {
	constructor(userId, items) {
		this.userId = userId;
		this.items = items;
		this.date = new Date().toISOString();
	}

	async save() {
		const query = `
			MATCH (u:User) WHERE u.id = '${this.userId}'
			CREATE (n:Order {id: apoc.create.uuid(), date: '${this.date}'}),
				(u)-[:PLACED_ORDER]->(n)
			RETURN n
		`;
		const result = await RunQuery(query);
		const order = result.records[0].get("n");

		for (const item of this.items) {
			const { id, quantity } = item;
			const createItemQuery = `
				MATCH (p:Product) WHERE p.id = '${id}'
				MATCH (o:Order) WHERE o.id = '${order.identity.low}'
				CREATE (p)-[:INCLUDED_IN {quantity: ${quantity}}]->(o)
			`;
			await RunQuery(createItemQuery);
		}
	}

	static async getAll() {
		const query = `MATCH (n:Order) RETURN n`;
		const result = await RunQuery(query);
		return result.records.map((record) => record.get("n"));
	}

	static async getOne(id) {
		const query = `MATCH (n:Order) WHERE n.id = '${id}' RETURN n`;
		const result = await RunQuery(query);
		if (result.records.length === 0) return null;
		return result.records[0].get("n");
	}

	static async getByUser(userId) {
		const query = `
			MATCH (u:User)-[:PLACED_ORDER]->(o:Order) WHERE u.id = '${userId}'
			RETURN o
		`;
		const result = await RunQuery(query);
		return result.records.map((record) => record.get("o"));
	}

	static async delete(id) {
		const query = `MATCH (n:Order) WHERE n.id = '${id}' DELETE n`;
		const result = await RunQuery(query);
		return `Delete operation for order ${id} ended successfully`;
	}
}

module.exports = Order;