const {Project,Carousel} = require('../models/Project')

//FETCH ALL PROJECTS
async function projectLogin(req, res) {
  const { id } = req.params;
  try {
    const project = await Project.find({logUrl:id}).populate('units');

    
    res.status(200).json(project)
  } catch (err) {
    res.status(400).json('Invalid Id');
  }
}

//FETCH ALL PROJECTS
async function getAllCarousels(req, res) {
  const { projectId } = req.params;

  try {
    // const carasols = await Carousel.find({project:projectId});
    const project = await Project.findById(projectId).populate('carousel')
    res.status(200)
    res.json(project.carousel)
  } catch (err) {
    res.status(400).json('Invalid Id');
  }
}


//UPDATE PROJECT SCREEN
async function updateProjectScreen(req, res) {
  const { projectId } = req.params;

  try {
   const project = await Project.find({project:projectId});
    project.update = project.update + 1
    await project.save()
    res.status(200)
    res.json('update started')
  } catch (err) {
    res.status(400).json('Invalid Id');
  }
}





module.exports = {
  projectLogin,
  getAllCarousels,
  updateProjectScreen,
};
