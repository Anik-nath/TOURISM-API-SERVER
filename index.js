const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
var cors = require("cors");

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8qp7t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("traveldb");
    const toursCollection = database.collection("tours");
    const destinationsCollection = database.collection("destinations");
    const bookedCollection = database.collection("booked");

    //tours data
    app.get("/tours", async (req, res) => {
      const cursor = toursCollection.find({});
      const donations = await cursor.toArray();
      res.send(donations);
    });
    //booked data
    app.get("/booked", async (req, res) => {
      const cursor = bookedCollection.find({});
      const booked = await cursor.toArray();
      res.send(booked);
    });
    //single tour
    app.get("/tours/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await toursCollection.findOne(query);
      res.json(result);
    });
    // destinations data
    app.get("/destinations", async (req, res) => {
      const cursor = destinationsCollection.find({});
      const donations = await cursor.toArray();
      res.send(donations);
    });
    //booking data
    app.post("/booked",async(req,res)=>{
      const booked = req.body;
      const result = await bookedCollection.insertOne(booked);
      res.json(result);
    })


  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Travelling site");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/* 

     

*/
