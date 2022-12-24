import { driver as _driver, auth } from 'neo4j-driver';
import express from 'express';

const app = express();
app.use(express.json());
const port = 3000;


let driver = null;
let session = null;

async function openSession() {
	driver = _driver('bolt://184.72.179.204:7687', auth.basic('neo4j', 'seeds-saturday-surrenders'));
	session = driver.session({ database: "neo4j" });
}
async function closeSession() {
	await session.close();
	await driver.close();
}


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
			const result = await session.run(
				'CREATE (p:Product {name: $name, price: $price, description: $description, categories: $categories}) RETURN p',
				{
					name: this.name,
					price: this.price,
					description: this.description,
					categories: this.categories
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

async function RunQuery(query) {
	//this function is here for testing purposes	
	await openSession();
	await session.run(query).then(async (result) => {
		console.log(result);
		await closeSession();
		return result;
	}).catch(async (error) => {
		console.log(error);
		await closeSession();
		return { error };
	}
	);
}


app.get('/', (req, res) => {
	res.send('Helslo World!');
})


app.post("/query", async (req, res) => {
	const query = req.body.query;
	const result = await RunQuery(query);
	console.log(result);
	res.send(result);

})


app.post('/products', async (req, res) => {
	try {
		const product = new Product(req.body.name, req.body.price, req.body.description, req.body.categories);
		console.log(req.body);
		const result = await product.save();
		console.log("result: ")
		res.send(result);
	} catch (error) {
		res.status(500).send(error.message);
	}
});


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
})
