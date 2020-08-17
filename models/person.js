"use strict"

const mongoose = require("mongoose");
const { Schema } = mongoose;

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
        ref: "post"
    }]

}, {
    timestamps: true
});

// personSchema.virtual("fullName").get(function(){
//     return `${this.name.first}${this.name.last}`;
// });

module.exports = mongoose.model("person", personSchema);