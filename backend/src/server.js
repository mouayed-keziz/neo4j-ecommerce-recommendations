const express = require("express");
const { config } = require("dotenv");
const { RunQuery } = require("./db_connect");
const product_router = require("../src/routers/productRouter");
const user_router = require("./routers/userRouter");
const order_router = require("./routers/orderRouter");
const cors = require("cors");


config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
  origin: '*',
}));
app.use("/products", product_router);
app.use("/users", user_router);
app.use("/orders", order_router);

app.get("/", (req, res) => {
  res.send("this is the root route");
});

app.get('/getip', function (req, res) {
  const ipAddress = req.socket.remoteAddress;
  res.send(ipAddress);
});



app.listen(port, () => {
  console.log(`backend is listening at http://localhost:${port}`);
});

