const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;
const Project = require("./Project");



//PACKAGE REVIEW SCHEMA
const imageSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    type: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

//PRODUCT SCHEMA
const gallerySchema = new Schema(
  {
    name: { type: String, default: "signcast_media_pic" },
    images: [imageSchema],
  },
  {
    timestamps: true,
  }
);

//CREATE gallery
gallerySchema.statics.createGallery = async function (req) {
  let { name, projectId } = req.body;
  const newgallery = await this.create();
  const project = await Project.findById(projectId);
  project.gallaryImages = newgallery._id;
  await project.save();

  return "Successfully created new gallery";
};

//CREATE gallery
gallerySchema.statics.addToGallery = async function (req) {
  let { name, projectId } = req.body;
  const newgallery = await this.create();
  const project = await Project.findById(projectId);
  project.gallaryImages = newgallery._id;
  await project.save();

  return "Successfully created new gallery";
};

module.exports = mongoose.model("Gallery", gallerySchema);
