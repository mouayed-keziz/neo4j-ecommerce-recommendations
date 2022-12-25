const auth = require("neo4j-driver").auth;
const _driver = require("neo4j-driver").driver;
const { config } = require("dotenv");

config();

const neo4jUrl = process.env.NEO4J_URL;
const neo4jUsername = process.env.NEO4J_USERNAME;
const neo4jPassword = process.env.NEO4J_PASSWORD;

let driver = null;
let session = null;

async function openSession() {
  driver = _driver(
    neo4jUrl,
    auth.basic(neo4jUsername, neo4jPassword)
  );
  session = driver.session({ database: "neo4j" });
}
async function closeSession() {
  await session.close();
  await driver.close();
}

async function RunQuery(query) {
  const PromisingFunction = async (query) => {
    await openSession();
    try {
      const result = await session.run(query);
      await session.close();
      return result;
    } catch (error) {
      session.close();
      console.error(error);
    } finally {
      await session.close();
    }
  };
  const data = await PromisingFunction(query);
  session.close();
  return data;
}

module.exports = { openSession, closeSession, RunQuery };



// --------------------------------------------
//
// runQuery(`MATCH (n) RETURN n LIMIT 25`).then((data) => {
//   const properties = data.map((node) => node.properties);
//   console.table(properties);
// }
// );
