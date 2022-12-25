const express = require("express");
const { config } = require("dotenv");
const product_router = require("../src/routes/product");
const { RunQuery } = require("./db_connect");

config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/products", product_router);


app.get("/", (req, res) => {
	res.send("this is the root route");
});
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
