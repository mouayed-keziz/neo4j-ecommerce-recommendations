var neo4j = require("neo4j-driver");
const { create_relationship } = require("./session");

const driver = neo4j.driver(
  "neo4j://localhost",
  neo4j.auth.basic("neo4j", "root100")
);

const session = driver.session();
function convertInt(neoInt) {
  return neo4j.integer.inSafeRange(neoInt)
    ? neo4j.integer.toNumber(neoInt)
    : neoInt;
}

function recommend(user_name) {
  session
    .run(
      "match (c:client) -[:buy]-> (p:product) where c.name= '" +
        user_name +
        "' return count(p)"
    )
    .then(function (result) {
      result.records.forEach(function (record) {
        var p = convertInt(record.get(0));
        if (p == 5) {
          recommendByCategory(user_name);
        } else {
          recommendByRating(user_name);
        }
      });
    });
}

function recommendByCategory(user_name) {
  let map = new Map();
  var max = "";
  session
    .run(
      "match (c:client) -[:buy]-> (p:product) where c.name= '" +
        user_name +
        "' return p.category"
    )
    .then(function (result) {
      result.records.forEach(function (record) {
        var p = record.get(0);
        if (map.has(p)) {
          let i = map.get(p);
          map.set(p, i + 1);
        } else {
          map.set(p, 1);
        }
      });
      max = [...map.keys()].reduce((a, e) => (e[1] > a[1] ? e : a));
    })
    .then(function () {
      session
        .run(
          " match (p:product) where p.category= '" +
            max +
            "' and not ((:client)-[:buy]->(p)) and not ((:client)-[:recommended]->(p)) return p.name order by p.rating desc limit 1"
        )
        .then(function (result) {
          result.records.forEach(function (record) {
            var p = record.get(0);
            console.log(p);
            create_relationship(user_name, p, "recommended");
          });
        });
    });
}
function recommendByRating() {
  console.log("by rating");
  session
    .run(
      " match (p:product) where not ((:client)-[:buy]->(p)) and not ((:client)-[:recommended]->(p)) return p.name order by p.rating desc limit 1"
    )
    .then(function (result) {
      result.records.forEach(function (record) {
        var p = record.get(0);
        create_relationship(user_name, p, "recommended");
      });
    });
}
module.exports = { recommendByCategory, recommendByRating, recommend };
