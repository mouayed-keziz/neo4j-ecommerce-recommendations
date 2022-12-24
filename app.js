const express = require("express");
const {
  recommendByCategory,
  recommendByRating,
  recommend,
} = require("./recomendSys");
const app = express();
port = 7000;
const {
  create_user,
  create_product,
  create_relationship,
} = require("./session");

///

app.get("/user", (req, res) => {
  const name = "user2",
    email = "hix@gmail.com",
    wilaya = "alger",
    password = "1111";
  create_user(name, email, wilaya, password);
  res.send("user.html");
});

app.get("/product", (req, res) => {
  const name = "product15",
    brand = "flask",
    price = 10100,
    category = "A",
    countInStock = 4,
    rating = 12;
  create_product(name, brand, price, category, countInStock, rating);
  res.send("dfghjk");
});

//function create relation

app.get("/buy", (req, res) => {
  (user_name = "user2"), (product_name = "product12"), (relation_name = "buy");

  create_relationship(user_name, product_name, relation_name);
  res.send("fiha");
});
///
app.get("/recommend", (req, res) => {
  user_name = "user1";
  recommendByCategory(user_name);
  res.send("done");
});
app.get("/rating", (req, res) => {
  user_name = "user2";
  recommend(user_name);
  res.send("here");
});
app.get("/", (req, res) => {
  res.send("Yoooooo");
});

app.listen(port, () => {
  console.log(`hello on port number ${port}`);
});

// res.send('Hello World!')
// session.run('MATCH(n:users) RETURN n').then(function(result){
//     result.records.forEach(function(record){console.log(record._fields[0].properties)})
// })
// .catch((err)=>{console.log(err)})

//
