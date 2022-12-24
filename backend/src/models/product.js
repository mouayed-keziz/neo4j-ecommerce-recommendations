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
    const query = `MATCH (n:Product) WHERE n.id = '${id}' SET n.name = '${name}', n.price = ${price}, n.description = '${description}', n.category = '${category}' RETURN n`;
    await RunQuery(query);
  }

  static async delete(id) {
    const query = `MATCH (n:Product) WHERE n.id = '${id}' DELETE n`;
    await RunQuery(query);
  }
}

module.exports = Product;


//try save
// const newproduct = new Product('HEROOOOO', 100, 'test', 'test');
// newproduct.save().then(() => console.log('saved'));


// Product.getOne('322595b5-d03c-461c-8896-e345e265849f').then((product) => {
//   console.log(product.properties.id);
//   Product.update(product.properties.id, 'HEROO', 1122, 'test', 'test').then(() => console.log('updated'));
// });


// Product.getAll().then((products) => {
//  products contains array of neo4j nodes
//  products.properties contains array of objects that has our data
//  console.table(products.map((product) => product.properties));
// });


// Product.getOne('322595b5-d03c-461c-8896-e345e265849f').then((product) => {
//   Product.delete(product.properties.id).then(() => console.log('deleted'));
// });
