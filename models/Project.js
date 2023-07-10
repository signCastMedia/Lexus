
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const carasol = new Schema({
  project:{ type: Schema.Types.ObjectId, ref: "Project",required:true},
  fileType: { type: String},
  fileName: { type: String},
  duration:{type:String},
  name:{type:String},
});

//PRODUCT SCHEMA
const project = new Schema(
  {
    projectName: { type: String },
    logo: { type: String, default: "logo" },
    altLogo: { type: String },
    categories: [{ type: String }],
    units: [{ type: Schema.Types.ObjectId, ref: "Unit" }],
    active: { type: Boolean, default: false },
    screens: [{ type: Schema.Types.ObjectId, ref: "Screen" }],
    account: { type: Schema.Types.ObjectId, ref: "Account" },
    update:{type:Number,default:0},
    screensNumber:{type:Number,default:0},
    carasolOrder:[{type:String}],
    carousel:[{ type: Schema.Types.ObjectId, ref: "Carousel" }]
  },
  {
    timestamps: true,
  }
);





const projectSchema = mongoose.model('Project', project)
const carouselSchema = mongoose.model('Carousel', carasol)

module.exports = { Project: projectSchema, Carousel: carouselSchema}