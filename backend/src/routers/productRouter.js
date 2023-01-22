const { v4: uuidv4 } = require('uuid');
const products = require("./products.json")
const {
  get_all_products,
  get_product_by_id,
  create_product,
  delete_product,
  update_product,
  get_some_products,
  get_recommandations
} = require("../controllers/productController");
const Product = require("../models/productModel");
const axios = require("axios");
const { RunQuery } = require('../db_connect');
const product_router = require("express").Router();

product_router.get("/seed", (req, res) => {
  //use interval to add 10 items per second


  let i = 0;
  const interval = setInterval(async () => {
    const product = products[i];
    product.id = uuidv4();
    const keys = Object.keys(product);
    const query = `CREATE (n:Product {id: '${uuidv4()}', ${keys.map(key => `${key}: '${product[key]}'`).join(', ')}}) RETURN n`;
    await RunQuery(query);
    console.log("seeding product number : " + i + " succeeded");
    i++;
    if (i >= products.length) {
      clearInterval(interval);
    }
  }, 100);
  res.send("Seeding products");
})
product_router.get("/", get_all_products);

product_router.get("/some/:limit", get_some_products)

product_router.get("/:id", get_product_by_id);

product_router.post("/", create_product);

product_router.delete("/:id", delete_product);

product_router.patch("/:id", update_product);

product_router.get("/recommandations/:id", get_recommandations);



module.exports = product_router;

