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

app.get("/planets", async (req, res) => {
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

app.get("/characters", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(charactersCollection);
    const characters = await collection.find({}).toArray();
    res.json(characters);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells...");
  }
});

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

const getElementById = async (elementId, aCollection) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(aCollection);
    const elements = await collection
      .find({ id: parseInt(elementId) })
      .toArray();
    return elements;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Internal server error");
  }
};

app.get("/films/:id", async (req, res) => {
  try {
    const film_id = req.params.id;
    const films = await getElementById(film_id, filmsCollection);
    res.json(films);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/characters:id", async (req, res) => {
  try {
    const characters_id = req.params.id;
    const characters = await getElementById(
      characters_id,
      charactersCollection
    );
    res.json(characters);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/planets:id", async (req, res) => {
  try {
    const planets_id = req.params.id;
    const planets = await getElementById(planets_id, planetsCollection);
    res.json(planets);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/films/:id/characters", async (req, res) => {
  try {
    const film_id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(filmsCharactersCollection);
    const film_character_keys = await collection
      .find({ film_id: film_id })
      .toArray();
    const characters = await Promise.all(
      film_character_keys.map(async (id) => {
        return await getElementById(id.character_id, charactersCollection);
      })
    );
    res.json(characters);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/films/:id/planets", async (req, res) => {
  try {
    const film_id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(filmsPlanetsCollection);
    const film_planet_keys = await collection
      .find({ film_id: film_id })
      .toArray();
    const planets = await Promise.all(
      film_planet_keys.map(async (id) => {
        return await getElementById(id.planet_id, planetsCollection);
      })
    );
    res.json(planets);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/characters/:id/films", async (req, res) => {
  try {
    const character_id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(filmsCharactersCollection);
    const character_film_keys = await collection
      .find({ character_id: character_id })
      .toArray();
    const films = await Promise.all(
      character_film_keys.map(async (id) => {
        return await getElementById(id.film_id, filmsCollection);
      })
    );
    res.json(films);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/planets/:id/films", async (req, res) => {
  try {
    const planet_id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(filmsPlanetsCollection);
    const planet_film_keys = await collection
      .find({ planet_id: planet_id })
      .toArray();
    const films = await Promise.all(
      planet_film_keys.map(async (id) => {
        return await getElementById(id.film_id, filmsCollection);
      })
    );
    res.json(films);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/planets/:id/characters", async (req, res) => {
  try {
    const planet_id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(charactersCollection);
    const characters = await collection
      .find({ homeworld: planet_id })
      .toArray();
    res.json(characters);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running.`);
});
