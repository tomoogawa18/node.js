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
                next(error);
            })
    },
    indexView: (req, res) => {
        res.redirect("/");
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
        next();
    },
    redirectView: (req, res) => {
        res.redirect('/post/index');
    },
    show: (req, res, next) => {
        let postId = req.params.id;

        post.findById(postId)
            .then(post => {
                res.locals.post = post;

                next();
            }).catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`)
                next(error);
            });
    },
    showView: (req, res) => {
        res.render('posts/show');
    },
    update: (req, res, next) => {
        let updateId = req.params.id;

        let postParam = {
            name: req.body.name,
            content: req.body.content
        };

        post.findByIdAndUpdate(updateId,{
            $set: postParam
        })
        .catch(error => {
            console.log(`Error updating post by ID: ${error.message}`);
        })

        next();
    },
    delete: (req, res, next) => {
        let postId = req.params.id;
        post.findByIdAndDelete(postId)
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
            });


        next();
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