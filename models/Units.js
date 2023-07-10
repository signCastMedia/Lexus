const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = require("mongodb").ObjectId;



const unitSchema = new Schema({
    projectId:{type:String, required:true},
    tenant: [{ type: String }],
    companyName: { type: String },
    catergories: { type: String },
    floor: { type: String },
    suite: { type: String ,unique:true },
    logo: { type: String },
    hide: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  });




module.exports = mongoose.model("Unit", unitSchema);
