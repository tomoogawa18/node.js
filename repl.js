const mongoose = require("mongoose"),
  post = require("./models/post"),
  person = require("./models/person");

var testPerson, testPost;

mongoose.connect(
  "mongodb://localhost:27017/post_db",
  { useNewUrlParser: true,
  useUnifiedTopology: true }
);
mongoose.Promise = global.Promise;

post.find({})
  .then(
    //items => console.log(items)
    )
  .then(() => {
    return post.deleteMany({name: "asd"});
  })
  .then(() => {
    return post.create({
      name: "yamada",
      content: "yamada"
    });
  })
  .then(post => {
    //console.log(`Created Subscriber: ${post.getInfo()}`);
  })
  .then(() => {
    return post.findOne({
      name: "yamada"
    });
  })
  .then(post => {
    testPost = post;
    //console.log(`Found one post: ${post.getInfo()}`);
  })
  .then(() => {
    return person.create({

      name:{
        first:"iii",
        last: "aaa"
      },
      email: "Locally farmed tomatoes only",
      password: 12345,
      //posts: ["yamada", "111"]
    });
  })
  .then(person => {
    testPerson = person;
    //console.log(`Created person: ${person}`);
  })
  .then(() => {
    testPerson.posts.push(testPost);
    testPerson.save();
   // console.log(testPerson);
  })
  .then(() => {
    return post.populate(testPerson, "_id");
  })
  .then(sample => console.log(sample))
  .then(() => {
    return person.find({
      posts: mongoose.Types.ObjectId(testPerson._id)
    });
  })
  .then(person => console.log(person));
