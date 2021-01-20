const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FacebookSchema = new Schema({
  NOMBRE:{
        type: String,
        required:true
  },
  EMAIL:{
    type: String,
    required:true
  },
  IDEN:{
    type: String,
    required:true
  },
  CONFIR:{
    type: String,
    required:true
  }
});

module.exports = mongoose.model("Facebook", FacebookSchema);
