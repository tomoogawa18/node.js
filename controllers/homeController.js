"use strict";

//const Express = require('express');

exports.index = (req, res) => {
  res.render('./partials/index.ejs');
};

exports.contact = (req, res) => {
  res.render('./partials/contact.ejs');
};