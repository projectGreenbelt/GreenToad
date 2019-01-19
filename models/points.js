const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointsSchema = new Schema({
  id: Number,
  name: { type: String, required: true },
  image: String,
  description: String, 
  address: String,
  location: String,
  date: { type: Date, default: Date.now }
});

const Points = mongoose.model("Points", pointsSchema);

module.exports = Points;
