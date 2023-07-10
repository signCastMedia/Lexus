const Screen = require("../models/Screen");
const Unit = require('../models/Units')
const Theme = require('../models/Theme')
const { Project } = require("../models/Project");

//GET ALL SCREENS THAT MATCH ID
async function getScreen(req, res) {
  const { screenId } = req.params;

  try {
    const screen = await Screen.findById(screenId).populate('project')
    const units = await Unit.find({projectId:screen.project._id})
    const theme = await Theme.findOne({projectId:screen.project._id})
    const project = await Project.findById(screen.project._id).populate('carousel')

    const newVal ={screen,units,theme,project}
    

    res.status(200).json(newVal)
  } catch (err) {
    res
      .status(400)
      .json("Error creating account at this moment. please try again later.");
  }
}




module.exports = {  getScreen };
