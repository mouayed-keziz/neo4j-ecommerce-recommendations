const { v4: uuidv4 } = require('uuid');

const {
  get_all_products,
  get_product_by_id,
  create_product,
  delete_product,
  update_product,
} = require("../controllers/productController");
const Product = require("../models/productModel");
const axios = require("axios");
const product_router = require("express").Router();

product_router.get("/", get_all_products);

product_router.get("/:id", get_product_by_id);

product_router.post("/", create_product);

product_router.delete("/:id", delete_product);

product_router.patch("/:id", update_product);


product_router.post("/seed", (req, res) => {
  const products = req.body;
  //for each product use interval of one second to save them
  let list = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const keys = Object.keys(product)
    const query = `CREATE (n:Product {id: '${uuidv4()}', ${keys.map(key => `${key}: '${product[key]}'`).join(', ')}}) RETURN n`;
    list.push(query);
  }
  const query = list.join(";");
  res.send({ message: query });
})

module.exports = product_router;
