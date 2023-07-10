const express = require("express");
const router = express.Router();
const unitCtrl = require("../controllers/unitController");

//CREATE PROJECTS
//seed units 
router.post("/seed", unitCtrl.seed);

//get all unit by id
router.get("/:projectId", unitCtrl.getUnitsById);

//delete unit by param id
router.delete('/:unitId',unitCtrl.deleteUnit)

//update unit
router.put('/update',unitCtrl.updateUnit)


//create unit
router.post('/create',unitCtrl.createUnit)



module.exports = router;
