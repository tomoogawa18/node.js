"user strict";

const router = require("express").Router();
const peopleController = require("../controllers/peopleController");

router.get("/index", peopleController.index, peopleController.indexView);
router.get("/new", peopleController.new);
router.post(
    "/create",
    peopleController.validate,
    peopleController.create,
    peopleController.indexRenderView
);
router.get("/login", peopleController.login);
router.post("/login", peopleController.authenticate, peopleController.redirectView);
//router.get("/logout", )
//router.get("/:id/edit", );
router.get("/:id", peopleController.show, peopleController.showView);
router.put("/:id/update", peopleController.update, peopleController.indexRedirectView);
router.delete("/:id/delete", peopleController.delete, peopleController.indexRedirectView);

module.exports = router;