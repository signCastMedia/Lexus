const express = require('express')
const router = express.Router()
const floorCtrl = require('../controllers/floorplanController')



//CREATE projects
router.post("/seed", floorCtrl.seed);
router.get("/getall", floorCtrl.getAll);
router.delete("/delete", floorCtrl.deleteFloor);
router.put("/update", floorCtrl.updateFloor);
router.post("/create", floorCtrl.createFloor);


module.exports = router;
