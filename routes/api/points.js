const router = require("express").Router();
const pointsController = require("../../controllers/pointsController");

// Matches with "/api/books"
router.route("/")
  .get(pointsController.findAll)
  .post(pointsController.create);

// Matches with "/api/points/:id"
router
  .route("/:id")
  .get(pointsController.findById)
  .put(pointsController.update)
  .delete(pointsController.remove);

module.exports = router;
