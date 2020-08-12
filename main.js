"use strict"

const express = require('express')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const postsController = require('./controllers/postsController');


const port = 3000;
const app = express();

mongoose.connect("mongodb://localhost:27017/post_db", { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.once("open", () => {
  console.log("＝＝データベースに接続完了！！＝＝");
});

app.set("view engine", "ejs");
app.use(
  express.static('public')
  //next();
)

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(expressLayouts);
app.use(errorController.logErrors);

app.get("/contact", homeController.contact)

app.get("/index", 
function (req, res) {
  homeController.index(req, res);
})

app.get("/post/index", postsController.index)
app.get("/post/new", postsController.new)
app.post("/post/create", postsController.create)


app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(port, () => {
  console.log('Running at Port 3000...');
});

