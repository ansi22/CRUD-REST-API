const mongoose = require("mongoose");

const developersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  productionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Developer", developersSchema);
