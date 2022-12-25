const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const login_user = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.getByEmail(email);
		if (!user) throw new Error("Invalid email or password");
		const valid = await bcrypt.compare(password, user.properties.password);
		if (!valid) throw new Error("Invalid email or password");
		res.send("login successful");
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
		const users = await User.getAll().then;
		res.send(users.map((user) => user.properties));
	} catch (error) {
		res.status(500).send(error.message);
	}
};

const get_one_user = async (req, res) => {
	try {
		const user = await User.getOne(req.params.id);
		res.send(user.properties);
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

module.exports = {
	login_user,
	register_user,
	get_all_users,
	get_one_user,
	update_user,
	delete_user
};