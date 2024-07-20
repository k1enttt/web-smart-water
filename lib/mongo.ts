import { MongoClient } from "mongodb";
import { env } from "process";

let client;
let collection;

const uri = env.MONGO_URI || "mongodb://localhost:27017";
const dbName = "smartwater";

export async function connectToMongoDB() {
  client = new MongoClient(uri);
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  };
  return client;
}

export async function closeMongoDB(client: MongoClient, timeInMs: number = 5000) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      console.log("Closing MongoDB connection");
      resolve(await client.close());
    }, timeInMs);
  });
}
