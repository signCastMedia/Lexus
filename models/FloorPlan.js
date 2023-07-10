const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const floorplanSchema = new Schema(
  {
    projectId:{type:String},
    productName: { type: String },
    subtitle: { type: String },
    exterior:{type:String},
    thumbnail: { type: String },
    thumbnailSmall:{type:String},
    gallery: { type: String },
    numOfBed: { type: String },
    sqFt: { type: String },
    sqFtOut: { type: String },
    sqFtTotal: { type: String },
    price:{ type: String },
    type:{ type: String },
    building:{type:String},
    bath:{ type: String },
    exposure:{type:String},
    bf:{type:String},
    hide:{type:Boolean,default:false}

  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("FloorPlan", floorplanSchema);
