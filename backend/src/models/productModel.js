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
    const query = `MATCH (n:Product) WHERE n.id = '${id}' RETURN n`;
    const result = await RunQuery(query);
    return result.records[0].get("n");
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
}

module.exports = Product;
