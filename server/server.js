import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const filmsCollection = process.env.MONGO_DB_FILMS_COLLECTION;
const filmsPlanetsCollection = process.env.MONGO_DB_FILMS_PLANETS_COLLECTION;
const filmsCharactersCollection =
  process.env.MONGO_DB_FILMS_CHARACTERS_COLLECTION;
const planetsCollection = process.env.MONGO_DB_PLANETS_COLLECTION;
const charactersCollection = process.env.MONGO_DB_CHARACTERS_COLLECTION;

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/films", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(filmsCollection);
    const films = await collection.find({}).toArray();
    res.json(films);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells...");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running.`);
});
