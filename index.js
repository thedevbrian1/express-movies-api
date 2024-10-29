import express from "express";
import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";

let port = 3000;
let app = express();

let uri = `mongodb+srv://hik75638:${process.env.MONGODB_PASSWORD}@cluster0.wwmwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let client = new MongoClient(uri);

let db = client.db("movies");
let collection = db.collection("movies");

app.get("/", async (req, res) => {
  res.send("ok");
});

// Movies route
// app.get("/movies", async (req, res) => {
//   let movies = await collection.find().toArray();

//   res.json(movies);
// });

//  Individual movie route
app.get("/movies/:id", async (req, res) => {
  let id = req.params.id;

  let movie = await collection.findOne({ _id: new ObjectId(id) });

  res.json(movie);
});

// Movies route (filtered and all)
app.get("/movies", async (req, res) => {
  // Get the query params if any e.g ?genre=action
  let query = req.query;
  let genre = query.genre;

  if (genre) {
    console.log({ query });

    let movies = await collection.find({ genre: genre }).toArray();
    res.json(movies);
  } else {
    let movies = await collection.find().toArray();

    res.json(movies);
  }
});

//localhost:3000/movies?genre=action

// Example domain: abc.com

// abc.com/movies
// abc.com/movies/:id
// abc.com/movies?genre="action"

http: app.listen(port, () => console.log(`Server started at port ${port}`));

// title, genre, rating, poster, year, length, actors, director
