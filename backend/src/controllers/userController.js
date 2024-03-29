const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const login_user = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.getByEmail(email);
		if (!user) throw new Error("Invalid email or password");
		const valid = await bcrypt.compare(password, user.properties.password);
		if (!valid) throw new Error("Invalid email or password");
		res.send({ email: user.properties.email, id: user.properties.id });
	} catch (error) {
		res.status(500).send(error.message);
	}
};

const register_user = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = new User(email, password);
		await user.save();
		res.send("User registered successfully");
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const get_all_users = async (req, res) => {
	try {
		const users = await User.getAll().then((users) => {
			res.send(users.map((user) => user.properties));
		}).catch((error) => {
			res.status(500).send(error.message);
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
};

const get_one_user = async (req, res) => {
	try {
		const user = await User.getOne(req.params.id).then((user) => {
			res.send(user.properties);
		}).catch((error) => {
			res.status(500).send("user not found");
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
};

const update_user = async (req, res) => {
	const id = req.params.id;
	const { email, password } = req.body;
	try {
		await User.update(id, email, password);
		res.send({ message: 'User updated successfully' });
	} catch (error) {
		res.status(500).send({ message: 'Error updating user' });
	}
};

const delete_user = async (req, res) => {
	try {
		const result = await User.delete(req.params.id);
		res.send({ message: result });
	} catch (error) {
		res.status(500).send(error.message);
	}
};

const add_to_cart = async (req, res) => {
	const { userId, productId, quantity } = req.body;
	try {
		User.addToCart(userId, productId, quantity).then((result) => {
			res.send(result);
		}).catch((error) => {
			res.status(500).send(error.message);
		});

	} catch (error) {
		res.send(error.message);
	}
};

const get_card_by_user_id = async (req, res) => {
	const products = User.get_products_incart(req.params.id).then((products) => {
		let new_products = products.map((product) => {
			return {
				id: product.properties.id,
				...product.properties
			}
		});
		res.send(new_products);
	}).catch((error) => {
		res.status(500).send(error.message);
	});
}


module.exports = {
	login_user,
	register_user,
	get_all_users,
	get_one_user,
	update_user,
	delete_user,
	add_to_cart,
	get_card_by_user_id
};