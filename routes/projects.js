const express = require("express");
const router = express.Router();
const projectsCtrl = require("../controllers/projectsController");


//GET ALL PROJECTS
router.get("/", projectsCtrl.projectLogin);

//GET ALL PROJECTS
router.get("/cara/:projectId", projectsCtrl.getAllCarousels);

//----------------------FOR FRONTEND LOGIN---------------------------//
//GET PRODUCT INFO FOR LOGIN INTO REMOTE SYSTEM 
router.get("/login/:id", projectsCtrl.projectLogin);




module.exports = router;
