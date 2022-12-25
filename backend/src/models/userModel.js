const { RunQuery } = require("../db_connect");
const bcrypt = require("bcrypt");

class User {
	constructor(email, password) {
		this.email = email;
		this.password = password;
	}

	async save() {
		this.password = await bcrypt.hash(this.password, 10);
		const checkQuery = `MATCH (n:User) WHERE n.email = '${this.email}' RETURN n`;
		const result = await RunQuery(checkQuery);
		if (result.records.length > 0) {
			throw new Error(`A user with the email ${this.email} already exists`);
		}
		const createQuery = `CREATE (n:User {id: apoc.create.uuid(), email: '${this.email}', password: '${this.password}'}) RETURN n`;
		await RunQuery(createQuery);
	}

	static async addToCart(userId, productId, quantity) {
		const query = `MATCH (u:User), (p:Product) WHERE u.id = '${userId}' AND p.id = '${productId}' CREATE (u)-[r:HAS_IN_CART {quantity: ${quantity}}]->(p) RETURN r`;
		const result = await RunQuery(query);
		return result.records[0].get("r");
	}

	static async getAll() {
		const query = `MATCH (n:User) RETURN n`;
		const result = await RunQuery(query);
		return result.records.map((record) => record.get("n"));
	}

	static async getOne(id) {
		const query = `MATCH (n:User) WHERE n.id = '${id}' RETURN n`;
		const result = await RunQuery(query);
		if (result.records.length === 0) return null;
		return result.records[0].get("n");
	}

	static async getByEmail(email) {
		const query = `MATCH (n:User) WHERE n.email = '${email}' RETURN n`;
		const result = await RunQuery(query);
		if (result.records.length === 0) return null;
		return result.records[0].get("n");
	}

	static async update(id, email, password) {
		// Hash the password before saving it to the database
		password = await bcrypt.hash(password, 10);
		const query = `
	  MATCH (n:User) WHERE n.id = '${id}'
	  SET ${Object.entries({ email, password })
				.filter(([, value]) => value)
				.map(([key, value]) => `n.${key} = '${value}'`)
				.join(", ")}
	  RETURN n
	`;
		await RunQuery(query);
	}

	static async delete(id) {
		const query = `MATCH (n:User) WHERE n.id = '${id}' DELETE n`;
		const result = await RunQuery(query);
		return `Delete operation for user ${id} ended successfully`;
	}
}

module.exports = User;


