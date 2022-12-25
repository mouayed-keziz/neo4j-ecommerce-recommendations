const { RunQuery } = require("../db_connect");

class Product {
  constructor(name, price, description, category) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
  }

  async save() {
    const query = `CREATE (n:Product {id: apoc.create.uuid(), name: '${this.name}', price: ${this.price}, description: '${this.description}', category: '${this.category}'}) RETURN n`;
    await RunQuery(query);
  }

  static async getOne(id) {
    const query = `MATCH (n:Product) WHERE n.id = '${id}' RETURN n`;
    const result = await RunQuery(query);
    return result.records[0].get('n');
  }

  static async getAll() {
    const query = `MATCH (n:Product) RETURN n`;
    const result = await RunQuery(query);
    return result.records.map((record) => record.get('n'));
  }

  static async update(id, name, price, description, category) {
    const query = `
      MATCH (n:Product) WHERE n.id = '${id}'
      SET ${Object.entries({ name, price, description, category }).filter(([, value]) => value).map(([key, value]) => `n.${key} = '${value}'`).join(', ')}
      RETURN n
    `;
    await RunQuery(query);
  }

  static async delete(id) {
    const query = `MATCH (n:Product) WHERE n.id = '${id}' DELETE n`;
    const result = await RunQuery(query);
    return `Delete operation for product ${id} ended successfully`
  }
}

module.exports = Product;

