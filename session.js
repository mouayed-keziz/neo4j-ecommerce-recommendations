var neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  "neo4j://localhost",
  neo4j.auth.basic("neo4j", "root100")
);
const session = driver.session();

function create_user(name, email, wilaya, password) {
  session.run(
    `create (n:client {name:'${name}',email:'${email}',wilaya:'${wilaya}',password:'${password}'}) return n`
  );
}
function create_product(name, brand, price, category, countInStock, rating) {
  session.run(
    `create (n:product {name:'${name}',brand:'${brand}',price:'${price}',category:'${category}',countInStock:'${countInStock}',rating:${rating}}) return n`
  );
}
function create_relationship(user_name, product_name, relation_name) {
  session
    .run(
      `MATCH (p:client) MATCH (l:product)  WHERE p.name ='${user_name}'  AND l.name='${product_name}' MERGE (p)-[:${relation_name}]->(l)  RETURN * `
    )
    .then(function (result) {});
}

module.exports = { create_user, create_product, create_relationship };
