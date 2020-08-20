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
    indexRenderView: (req, res) => {
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
    renderView:  (req, res, next) => {
        let renderPath = res.locals.render;
        if (renderPath) res.redirect(renderPath);
        else next();
      },
    indexRedirectView: (req, res) => {
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
            if(person){
                person.passwordComparison(req.body.password)
                    .then((passwordsMatch) => {
                        if(passwordsMatch){
                            res.locals.redirect = `/person/${person._id}`;
                            req.flash("success", "認証に成功しました。");
                            res.locals.flashMessages = req.flash();

                            res.locals.person = person;
                        } else {
                            req.flash("error", "認証に失敗しました。");
                            res.locals.flashMessages = req.flash();
                            res.locals.redirect = "/person/login";
                        }
                        next();
                    })
            }
        })
        .catch(error => {
            console.log("ログインエラー");
            next(error);
        });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath)
        else next()
    },
    validate: (req, res, next) => {
        next();
    }
};