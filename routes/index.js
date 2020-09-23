"use strict";

//各ルートを読み込む
const router = require("express").Router();
const personRoutes = require("./personRoutes");
const postRoutes = require("./postRoutes");
const errorRoutes = require("./errorRoutes");
const homeRoutes = require("./homeRoutes");

router.use("/person", personRoutes);
router.use("/post", postRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;