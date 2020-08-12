"use strict"

const post = require('../models/post');

module.exports = {
    index: (req, res, next) => {
        post.find({})
            .exec()
            .then((posts)=>{
                //console.log(posts.getInfo);
                res.render('posts/index.ejs',{posts: posts});
                })
            .catch((error)=>{
                console.log("post/index:" + error);
                return [];
            })
    },
    new: (req, res, next) => {
        res.render('posts/new.ejs');
    },
    create:(req, res, next) => {
        let newPost = new post({
            name: req.body.name ,
            content: req.body.content
        });
        newPost.save();
        res.redirect('/post/index');
    }
};

//exports.index = (req, res, next) => {
    //     post.find({})
    //         .exec()
    //         .then((posts)=>{
    //             //console.log(posts.getInfo);
    //             res.render('posts/index.ejs',{posts: posts});
    //             })
    //         .catch((error)=>{
    //             console.log("post/index:" + error);
    //             return [];
    //         })
    // };
    
    // exports.new = (req, res, next) => {
    //     res.render('posts/new.ejs');
    // };
    
    // exports.create = (req, res, next) => {
    //     let newPost = new post({
    //         name: req.body.name ,
    //         content: req.body.content
    //     });
    //     newPost.save();
    //     res.redirect('/post/index');
    // };