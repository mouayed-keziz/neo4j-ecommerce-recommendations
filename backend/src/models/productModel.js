const { RunQuery } = require("../db_connect");
const { v4: uuidv4 } = require('uuid');


class Product {
  constructor(body) {
    this.body = body
  }

  async save() {
    const keys = Object.keys(this.body)
    const query = `CREATE (n:Product {id: "${uuidv4()}", ${keys.map(key => `${key}: '${this.body[key]}'`).join(', ')}}) RETURN n`;
    await RunQuery(query);
  }

  static async getOne(id) {
    try {
      const query = `MATCH (n:Product) WHERE n.id = '${id}' RETURN n`;
      const result = await RunQuery(query);
      return result.records[0].get("n");
    } catch (error) {
      console.log("hhh")
    }
  }

  static async getAll() {
    const query = `MATCH (n:Product) RETURN n`;
    const result = await RunQuery(query);
    return result.records.map((record) => record.get("n"));
  }

  static async update(id, name, price, description, category) {
    const query = `
      MATCH (n:Product) WHERE n.id = '${id}'
      SET ${Object.entries({ name, price, description, category })
        .filter(([, value]) => value)
        .map(([key, value]) => `n.${key} = '${value}'`)
        .join(", ")}
      RETURN n
    `;
    await RunQuery(query);
  }

  static async delete(id) {
    const query = `MATCH (n:Product) WHERE n.id = '${id}' DELETE n`;
    const result = await RunQuery(query);
    return `Delete operation successfully`;
  }

  static async get_recommandations(id) {
    const query = `MATCH (u:User {id:'${id}'})
    OPTIONAL MATCH (u)-[:HAS_IN_CART]->(p:Product)
    OPTIONAL MATCH (u)-[:PLACED_ORDER]->(o:Order)-[:INCLUDES]->(p2:Product)
    WITH COLLECT(DISTINCT p) + COLLECT(DISTINCT p2) as products, u
    UNWIND products as product
    MATCH (otherUser:User)-[:PLACED_ORDER|HAS_IN_CART]->(p3:Product)
    WHERE NOT (u)-[:PLACED_ORDER|HAS_IN_CART]->(p3) AND p3.id <> product.id 
    OR (p3.cpu = product.cpu OR p3.gpu = product.gpu OR p3.brand = product.brand)
    WITH DISTINCT p3, COUNT(DISTINCT otherUser) as similarity 
    ORDER BY similarity DESC
    RETURN p3 LIMIT 12`
    const result = await RunQuery(query);
    return result.records.map((record) => record.get("p3"));
  }
}

module.exports = Product;
