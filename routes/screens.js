const express = require("express");
const router = express.Router();
const screenCtrl = require("../controllers/screenController");

//CREATE PROJECTS
//seed units 



//delete unit by param id
router.get('/getscreen/:screenId',screenCtrl.getScreen)




module.exports = router;

