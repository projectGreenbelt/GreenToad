const router = require("express").Router();
const pointsRoutes = require("./points");

// Book routes
router.use("/points", pointsRoutes);

module.exports = router;
