const express = require("express");
const router = express.Router();
const themeCtrl = require("../controllers/themeController");



router.post("/update",themeCtrl.updateTheme);
router.get("/get/:projectId",themeCtrl.getTheme);


module.exports = router;

