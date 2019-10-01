const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeneralistasSchema = new Schema({
  ID:{
        type: String,
        required:true
  },
  NOMBRE_GENERALISTA:{
    type: String,
    required:true
  },
  UBICACION:{
    type: String,
    required:true
  },
  EXT: {
    type: String,
    required:true
  },
  CEL: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model("Generalistas", GeneralistasSchema);
