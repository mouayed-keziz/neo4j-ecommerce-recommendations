const auth = require("neo4j-driver").auth;
const _driver = require("neo4j-driver").driver;

let driver = null;
let session = null;

async function openSession() {
  driver = _driver('bolt://184.72.179.204:7687',
    auth.basic('neo4j', 'seeds-saturday-surrenders'),
  );
  session = driver.session({ database: "neo4j" });
}
async function closeSession() {
  await session.close();
  await driver.close();
}

async function RunQuery() {
  return session.run
}


module.exports = { openSession, closeSession, RunQuery, RunQuery2 };

// --------------------------------------------

//this function is here for testing purposes
async function RunQuery2(query) {
  await openSession();
  try {
    const result = await RunQuery(
      "CREATE (p:Product {id: apoc.create.uuid() ,name: $name, price: $price, description: $description, categories: $categories}) RETURN p",
      {
        name: this.name,
        price: this.price,
        description: this.description,
        categories: this.categories,
      }
    );
    await closeSession();
    return result.records[0].get(0);
  } catch (error) {
    await closeSession();
    throw error;
  }
}



async function runQuery3(query) {
  const PromisingFunction = async (query) => {
    await openSession();
    try {
      const result = await session.run(query);
      const data = result.records.map((record) => record.get('n'));
      await session.close();
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      await session.close();
    }
  }

  return PromisingFunction(query);

}


runQuery3(`MATCH (n) RETURN n LIMIT 25`).then((data) => {
  // console.table(data);
  const properties = data.map((node) => node.properties);
  console.table(properties);
  closeSession();
}
);