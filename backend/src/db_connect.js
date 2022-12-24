const auth = require("neo4j-driver").auth;
const _driver = require("neo4j-driver").driver;

let driver = null;
let session = null;

async function openSession() {
  driver = _driver(
    "bolt://184.72.179.204:7687",
    auth.basic("neo4j", "seeds-saturday-surrenders")
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
