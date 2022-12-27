const { RunQuery } = require("../db_connect");

class Order {
	constructor(userId) {
		this.userId = userId;
	}

	async save() {
		const query1 = `
		MATCH (u:User {id: '${this.userId}'})-[r:HAS_IN_CART]->(p:Product)
		WITH collect(p) as products, u
		CREATE (o:Order {id: apoc.create.uuid(), date: datetime()})
		CREATE (u)-[:PLACED_ORDER]->(o)
		FOREACH (product IN products | CREATE (o)-[:INCLUDES]->(product))
		RETURN o`;
		const query2 = `
		MATCH (u:User {id: '${this.userId}'})-[r:HAS_IN_CART]->(p:Product)
		DELETE r`;

		const result1 = await RunQuery(query1).then(async (result) => {
			const result2 = await RunQuery(query2).then((result) => {
				return result;
			}).catch((err) => {
				return err;
			});
		}).catch((err) => {
			return err;
		});
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







// MATCH (u:User {id: '153651b0-0cd4-40a4-9c29-e03ab7320c8b'})-[r:HAS_IN_CART]->(p:Product)
// WITH collect(p) as products, u
// CREATE (o:Order {id: apoc.create.uuid(), date: datetime()})
// CREATE (u)-[:PLACED_ORDER]->(o)
// FOREACH (product IN products | CREATE (o)-[:INCLUDES]->(product))
// RETURN o

// MATCH (u:User {id: '153651b0-0cd4-40a4-9c29-e03ab7320c8b'})-[r:HAS_IN_CART]->(p:Product)
// DELETE r