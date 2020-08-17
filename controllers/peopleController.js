"use strict"

const person = require('../models/person');

module.exports = {
    index: (req, res, next) => {
        person.find({})
            .exec()
            .then((people) => {
                //console.log(posts.getInfo);
                res.render('people/index.ejs', {
                    people: people
                });
            })
            .catch((error) => {
                console.log("people/index:" + error);
                next(error);
            })
    },
    indexView: (req, res) => {
        res.redirect("/");
    },
    new: (req, res, next) => {
        res.render('people/new.ejs');
    },
    create: (req, res, next) => {
        let newPerson = new person({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        person.create(newPerson)
        .then(() => {
           req.flash("success", "ユーザーの登録に成功しました。");
           res.locals.flashMessages = req.flash();
           next();
        })
        .catch(() => {
            req.flash("error", "failed to create");
            next();
        });
    },
    renderView: (req, res) => {
        person.find({})
            .exec()
            .then((people) => {
                //console.log(posts.getInfo);
                res.render('people/index.ejs', {
                    people: people
                });
            })
            .catch((error) => {
                console.log("people/index:" + error);
                next(error);
            })
    },
    redirectView: (req, res) => {
            res.redirect('/person/index');
    },
    show: (req, res, next) => {
        let personId = req.params.id;

        person.findById(personId)
            .then(people => {
                res.locals.people = people;

                next();
            }).catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`)
                next(error);
            });
    },
    showView: (req, res) => {
        res.render('people/show');
    },
    update: (req, res, next) => {
        let updateId = req.params.id;

        let personParam = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };

        person.findByIdAndUpdate(updateId, {
                $set: personParam
            })
            .catch(error => {
                console.log(`Error updating post by ID: ${error.message}`);
            })

        next();
    },
    delete: (req, res, next) => {
        let personId = req.params.id;
        person.findByIdAndDelete(personId)
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
            });
        next();
    },
    login: (req, res) => {
        res.render('people/login');
    },
    authenticate: (req, res, next) => {
        person.findOne({
            email: req.body.email
        })
        .then(person => {
            if (person && person.password === req.body.password) {
                console.log("login")

                req.flash("login", "ユーザーのログインに成功しました。");
                res.locals.flashMessages = req.flash();

                next();
            } else {
                next();
            }
        })
        .catch(error => {
            console.log("ここ通ってる");
            next(error);
        });
    }
};