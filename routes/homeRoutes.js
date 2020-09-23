"use strict";

const router = require("express").Router();
const homeController = require("../controllers/homeController");


router.get("/contact", homeController.contact);
router.get("/index", homeController.index);

module.exports = router;