const router = require("express").Router();
const pointsRoutes = require("./points");
const postsRoutes = require("./posts");

// Book routes
router.use("/points", pointsRoutes);
router.use("/posts", postsRoutes);

module.exports = router;
