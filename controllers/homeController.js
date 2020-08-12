"use strict";

module.exports = {
    index: (req, res) => {
      res.render('./partials/index.ejs');
    },
    contact: (req, res) => {
      res.render('./partials/contact.ejs');
    }
};