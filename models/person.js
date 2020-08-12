"use strict"

const mongoose = require("mongoose");
const { Schema } = mongoose;

const personSchema = new Schema({
    name: {
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
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
        ref: "post"
    }]

}, {
    timestamps: true
});

personSchema.virtual("fullName").get(function(){
    return `${this.name.first}${this.name.last}`;
});

module.exports = mongoose.model("person", personSchema);