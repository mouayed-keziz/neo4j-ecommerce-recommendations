const Product = require("../models/productModel");

const get_all_products = async (req, res) => {
  Product.getAll()
    .then((products) => {
      res.send(products.map((product) => product.properties));
    })
    .catch((error) => {
      res.status(500).send({ message: "products not found" });
    });
};

const get_product_by_id = async (req, res) => {
  Product.getOne(req.params.id)
    .then((product) => {
      res.send(product.properties);
    })
    .catch((error) => {
      res.status(500).send({ message: "product not found" });
    });
};

const create_product = async (req, res) => {
  try {
    ["name", "price", "description", "category"].forEach((item) => {
      if (!req.body[item]) {
        throw new Error(`${item} is required`);
      }
    });
    const product = new Product(
      req.body.name,
      req.body.price,
      req.body.description,
      req.body.categories
    );
    await product
      .save()
      .then(() => {
        res.send(product);
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const delete_product = async (req, res) => {
  try {
    const result = await Product.delete(req.params.id);
    Product.delete(req.params.id)
      .then((message) => {
        res.send({ message });
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const update_product = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, description, category } = req.body;
    await Product.update(id, name, price, description, category);
    res.send({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error updating product" });
  }
};

module.exports = {
  get_all_products,
  get_product_by_id,
  create_product,
  delete_product,
  update_product,
};
