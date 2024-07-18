import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "process";

const uri = env.MONGO_URI || "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const database = client.db("smartwater");
    const plants = database.collection("plants");

    // Query for all the plants
    const query = {};
    const plantList = await plants.find(query).toArray();

    console.log(plantList);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// run().catch(console.dir);
