const { openSession, closeSession, RunQuery } = require("../db_connect");

class Product {
  constructor(name, price, description, categories) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.categories = categories;
  }

  async save() {
    await openSession();
    try {
      const result = await RunQuery(
        "CREATE (p:Product {id: apoc.create.uuid() ,name: $name, price: $price, description: $description, categories: $categories}) RETURN p",
        {
          name: this.name,
          price: this.price,
          description: this.description,
          categories: this.categories,
        }
      );
      await closeSession();
      return result.records[0].get(0);
    } catch (error) {
      await closeSession();
      throw error;
    }
  }
  static async getAll() {
    await openSession();
    try {
      const result = await RunQuery("MATCH (p:Product) RETURN p");
      await closeSession();
      return result;
    } catch (error) {
      await closeSession();
      throw error;
    }
  }

  static async getOne(id) {
    await openSession();
    try {
      const result = await RunQuery(
        "MATCH (p:Product) WHERE ID(p) = $id RETURN p",
        {
          id: id,
        }
      );
      await closeSession();
      return result.records[0].get(0);
    } catch (error) {
      await closeSession();
      throw error;
    }
  }

  static async delete(id) {
    await openSession();
    try {
      const result = await RunQuery(
        "MATCH (p:Product) WHERE ID(p) = $id DELETE p",
        {
          id: id,
        }
      );
      await closeSession();
      return result.records[0].get(0);
    } catch (error) {
      await closeSession();
      throw error;
    }
  }
}

module.exports = Product;
