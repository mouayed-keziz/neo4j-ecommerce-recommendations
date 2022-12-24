const Product = require("../models/product");
const product_router = require("express").Router();

product_router.get("/", async (req, res) => {
  const products = await Product.getAll();
  res.send(products);
});

product_router.get("/hello", (req, res) => {
  res.send("hello world this is a quick test");
})

product_router.get("/:id", async (req, res) => {
  const product = await Product.getOne(req.params.id);
  res.send(product);
});

product_router.post("/", async (req, res) => {
  try {
    const product = new Product(
      req.body.name,
      req.body.price,
      req.body.description,
      req.body.categories
    );
    const result = await product.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

product_router.delete("/:id", async (req, res) => {
  try {
    const result = await Product.delete(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = product_router;
