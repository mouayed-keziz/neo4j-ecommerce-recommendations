const {
  get_all_products,
  get_product_by_id,
  create_product,
  delete_product,
  update_product,
} = require("../controllers/productController");
const product_router = require("express").Router();

product_router.get("/", get_all_products);

product_router.get("/:id", get_product_by_id);

product_router.post("/", create_product);

product_router.delete("/:id", delete_product);

product_router.patch("/:id", update_product);

module.exports = product_router;
