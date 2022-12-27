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

	static async rate(userId, productId, rating) {
		const query = `
		MATCH (u:User {id: '${userId}'})-[:PLACED_ORDER]->(o:Order)-[r:INCLUDES]->(p:Product {id: '${productId}'})
		SET r.rating = ${rating}
		RETURN r`;
		const result = await RunQuery(query);
		return result.records[0].get("r");
	}

	static async generateRecommendations(userId) {
		try {
			// Find the user's purchased products
			const purchasedProductsResult = await RunQuery(
				`MATCH (u:User { id: '${userId}' })-[:PLACED_ORDER]->(o:Order)-[:INCLUDES]->(p:Product)
			 RETURN p.id AS productId`
			).then(async (result) => {
				if (result.records.length === 0) return [];
				const purchasedProductIds = purchasedProductsResult.records.map(record => record.get("productId"));

				// Find other users who have purchased the same products
				const similarUsersResult = await RunQuery(
					`MATCH (u:User)-[:PLACED_ORDER]->(o:Order)-[:INCLUDES]->(p:Product)
			 WHERE p.id IN '${purchasedProductIds}' AND u.id <> '${userId}'
			 WITH u, COUNT(p) AS numMatchingPurchases
			 ORDER BY numMatchingPurchases DESC
			 LIMIT 5
			 MATCH (u)-[:PLACED_ORDER]->(o:Order)-[:INCLUDES]->(p:Product)
			 WHERE NOT p.id IN '${purchasedProductIds}'
			 RETURN p.id AS productId, COUNT(p) AS numPurchases
			 ORDER BY numPurchases DESC`,
					{ userId, purchasedProductIds }
				);
				const recommendedProductIds = new Set();
				for (const record of similarUsersResult.records) {
					recommendedProductIds.add(record.get("productId"));
				}

				// Return the recommended product IDs
				return [...recommendedProductIds];
			}).catch((err) => {
				return err;
			});

		} catch (err) {
			console.log(err);
			return [];
		}
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