const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
var cors = require("cors");

const port = 5000;
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

    //tours data
    app.get("/tours", async (req, res) => {
      const cursor = toursCollection.find({});
      const donations = await cursor.toArray();
      res.send(donations);
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

         //post api
      app.post('/tours',async (req,res)=>{
          const donation = req.body;
          console.log("hit the post",donation);
          const result = await toursCollection.insertOne(donation);
          console.log(result);
          res.json(result);
      })



        //single api
      app.get('/donations/:id',async (req,res)=>{
        const id = req.params.id;
        // console.log(id);
        const query = {_id: ObjectId(id)};
        const result  = await toursCollection.findOne(query);
        res.json(result);
      })
*/
