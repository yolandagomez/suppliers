const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  category: {
    type: String,
    required: [true],
  },
  poster: {
    type: String,
    required: [true],
  },
  title: {
    type: String,
    required: [true],
  },
  plot: {
    type: String,
    required: [true],
  },
  year: {
    type: Number,
    required: [true],
  },
  rating: Number,
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;