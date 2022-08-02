const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

// ========================
// Link to Database
// ========================

const connectionString =
  "mongodb+srv://Luke12:Imyourdad15%40@cluster0.shlujjq.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("star-wars-quotes"); // changing the db name
    const quotesCollection = db.collection("quotes"); // named our collection and specified it
    // ========================
    // Middlewares
    // ========================
    app.use(bodyParser.urlencoded({ extended: true })); // help us tidy up the request object before we use them
    // urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object

    // ========================
    // Routes
    // ========================
    app.get("/", (request, respond) => {
      respond.sendFile(__dirname + "/index.html");
      // Note: __dirname is the current directory i'm in.
    });

    app.post("/quotes", (request, respond) => {
      quotesCollection
        .insertOne(request.body)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    });

    // ========================
    // Listen
    // ========================
    app.listen(3000, function () {
      console.log("listening on port 3000");
    });
  })
  .catch(console.error);
