"use strict"

const express = require('express')
const router = express.Router();
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const postsController = require('./controllers/postsController');
const peopleController = require('./controllers/peopleController');


const port = 3000;
const app = express();

mongoose.connect("mongodb://localhost:27017/post_db", { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

db.once("open", () => {
  console.log("＝＝データベースに接続完了！！＝＝");
});

app.set("view engine", "ejs");
router.use(express.static('public'))

router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json());
router.use(expressLayouts);
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));


router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
router.use(connectFlash());

router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

router.get("/contact", homeController.contact)
router.get("/index", homeController.index)

router.get("/post/index", postsController.index, postsController.indexView, ()=>{console.log(res.locals.flashMessages);})
router.get("/post/new", postsController.new)
router.post("/post/create", postsController.create, postsController.redirectView)
router.get("/post/:id", postsController.show, postsController.showView);
router.put("/post/:id/update", postsController.update, postsController.redirectView);
router.delete("/post/:id/delete", postsController.delete, postsController.redirectView);

router.get("/person/login", peopleController.login);
router.post("/person/login", peopleController.authenticate, peopleController.renderView);
router.get("/person/index", peopleController.index, peopleController.indexView);
router.get("/person/new", peopleController.new);
router.post("/person/create", peopleController.create, peopleController.renderView);
router.get("/person/:id", peopleController.show, peopleController.showView);
router.put("/person/:id/update", peopleController.update, peopleController.redirectView);
router.delete("/person/:id/delete", peopleController.delete, peopleController.redirectView);


router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/", router);

app.listen(port, () => {
  console.log('Running at Port 3000...');
});

