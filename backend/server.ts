import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion, Db, Collection } from "mongodb";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://lukefixari:<devdash101>@devdash-db.ifn7t2l.mongodb.net/?retryWrites=true&w=majority&appName=devdash-db";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db: Db;
let tasksCollection: Collection;

async function connectDB() {
  await client.connect();
  db = client.db("devdash"); // You can name this however you want
  tasksCollection = db.collection("tasks");
  console.log("Connected to MongoDB");
}

connectDB().catch(console.error);
