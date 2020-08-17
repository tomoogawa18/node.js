"use strict"

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({ 
    content: {
        type:'String' ,
        required: true,
        maxlength: 140
    }
});

//一つのドキュメントの内容を表す。（複数は不可）
// postSchema.methods.getInfo = function(){
//     return `Name: ${this.name} Content:${this.content}`;
// }

// postSchema.methods.findOgawaPost = function(){
//     return this.model("post")
//         .find({name: "小川"})
//         .exec();
// }

//saveメソッドの前に実行されるメソッド
postSchema.pre("save", function(next){
    let post = this;
    next();
});

module.exports = mongoose.model('post', postSchema);  