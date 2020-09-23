"use strict"

const router = require("express").Router();
const postsController = require("../controllers/postsController");

router.get("/index", postsController.index, postsController.indexView, ()=>{console.log(res.locals.flashMessages);})
router.get("/new", postsController.new)
router.post("/create", postsController.create, postsController.redirectView)
router.get("/:id", postsController.show, postsController.showView);
router.put("/:id/update", postsController.update, postsController.redirectView);
router.delete("/:id/delete", postsController.delete, postsController.redirectView);

module.exports = router;