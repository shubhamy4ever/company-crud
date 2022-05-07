const mongoose = require("mongoose");
const companySchema = mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  companyDescription: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  contactEmail: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  date:{type:Date,default:Date()}
});

module.exports = mongoose.model("company", companySchema);

  // logo to be added