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
    app.set("view engine", "ejs"); // tells express we're using EJS
    app.use(bodyParser.urlencoded({ extended: true })); // help us tidy up the request object before we use them
    // urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object
    app.use(express.static("public"));
    app.use(bodyParser.json());

    // ========================
    // Routes
    // ========================
    app.get("/", (request, respond) => {
      //   respond.sendFile(__dirname + "/index.html");
      //   // Note: __dirname is the current directory i'm in.
      db.collection("quotes")
        .find()
        .toArray() //converting data into an array
        .then((result) => {
          respond.render("index.ejs", { quotes: result });
          //   console.log(result);
        })
        .catch((error) => console.error(error));
    });

    app.post("/quotes", (request, respond) => {
      quotesCollection
        .insertOne(request.body)
        .then((result) => {
          respond.redirect("/"); // no need to respond to browser, redirecting back to root file
          console.log(result);
        })
        .catch((error) => console.error(error));
    });

    app.put("/quotes", (request, respond) => {
      console.log(request.body);
      quotesCollection
        .findOneAndUpdate(
          { name: "Yoda" }, // query
          {
            $set: {
              name: request.body.name,
              quote: request.body.quote,
            }, // update
          },
          {
            upsert: true, // upsert means insert a doc if no docs can be updated
          }
        )
        .then((result) => {
          respond.json("Success");
        })
        .catch((errors) => console.error(error));
    });

    // ========================
    // Listen
    // ========================
    app.listen(3000, function () {
      console.log("listening on port 3000");
    });
  })
  .catch(console.error);
