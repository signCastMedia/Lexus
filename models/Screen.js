const mongoose = require("mongoose");
const Schema = mongoose.Schema;



//PRODUCT SCHEMA
const screenSchema = new Schema(
    {
      project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
      coords: [{ coordY: { type: String }, coordX: { type: String } }],
      kioskId:{type:String},
      name:{type:String}
       
    },
    {
      timestamps: true,
    }
  );
  



module.exports = mongoose.model("Screen", screenSchema);
