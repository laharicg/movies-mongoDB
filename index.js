const express = require("express");
const mongodb =require("mongodb");
const bodyParser = require("body-parser")
const url ="mongodb://localhost:27017"
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

app.post("/movie",async(req,res) => {
    console.log(req.body)
    try {
        let client = await mongodb.connect(url)
        let db = client.db("node");
        let data = await db.collection("movies").insertOne(
            {
                Movie_name : req.body.Movie_name,
                Rating:req.body.Rating,
                Language:req.body.Language,
            }
        )
        await client.close()
    } catch (error) {
        console.log(error)
        
    }
    res.json({
        message:"saved data"
    })
})
app.get("/film/:id",async(req,res) => {
    try {
        let client = await mongodb.connect(url)
        let db = client.db("node");
        let data = await db.collection("movies").findOne({_id : mongodb.ObjectId(req.params.id)})
        await client.close()
        res.json( data);

    } 
    catch (error) {
        console.log(error)
    }
})
app.get("/All",async(req,res) => {
    try {
        let client = await mongodb.connect(url)
        let db = client.db("node");
        let data = await db.collection("movies").find().toArray();
        await client.close()
        console.log(data)
        res.json( data);

    } 
    catch (error) {
        console.log(error)
    }
})

/*
app.get("/search",async(req,res) => {
    try {
        let client = await mongodb.connect(url)
        let db = client.db("node");
        let data = await db.collection('movies').find({
            "$text": {
              "$search": req.body.query
            }
          })
        await client.close()
        console.log(data)
        res.json( data);

    } 
    catch (error) {
        console.log(error)
    }
}) */

app.get("/findmovie/:Movie_name", async (req, res) => {
    console.log(req.body);
    try {
      let client = await mongodb.connect(url);
      let db = client.db("node");
      console.log(db);
      let data = await db.collection("movies").find({"Movie_name":req.body.Movie_name}).toArray();
      await client.close();
      res.json({
       message:"success",
       data:data,
      });
    } catch (err) {
      console.log(err);
    }
  });

app.listen(4040,function(){
    console.log("success")

})
