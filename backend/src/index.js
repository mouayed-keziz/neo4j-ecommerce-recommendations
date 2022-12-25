const express = require("express");
const { config } = require("dotenv");

const product_router = require("../src/routes/product");
const { RunQuery } = require("./db_connect");

config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/products", product_router);

// --------------------------------------------

app.get("/", (req, res) => {
	res.send(
		'<div style="width:100%;height:90vh;display:flex;justify-content:center;align-items:center;"><h1>this is the root route</h1></div>'
	);
});

app.post("/query", async (req, res) => {
	const query = req.body.query;
	await RunQuery(query).then((data) => {
		const result = data.records.map((record) => record.get("p"));
		res.send(result);
	}).catch((err) => {
		res.send(JSON.stringify(err));
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
