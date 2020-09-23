"use strict"

const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const personSchema = new Schema({
    name: {
          type: String,
          trim: true,
          require: true
      },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    posts: [{
        type: mongoose.Schema.ObjectId,
        ref: "post",
        aaa: "aaa"
    }]

}, {
    timestamps: true
});

personSchema.pre("save", function(next){
    let person = this;
    bcrypt.hash(person.password, 10)
        .then((hash)=>{
            person.password = hash;
            next();
        })
        .catch(error => {
            console.log(error);
            next(error);
        });
});

personSchema.methods.passwordComparison = function(inputPassword){
    let person = this;
    return bcrypt.compare(inputPassword, person.password);
}

module.exports = mongoose.model("person", personSchema);