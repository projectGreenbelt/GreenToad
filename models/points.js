const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointsSchema = new Schema({
  id: Number,
  name: { type: String, required: true, unique: true },
  image: String,
  description: String,
  address: String,
  location: String,
  date: { type: Date, default: Date.now },
  posts: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: "Posts"
    }
  ]
});

const Points = mongoose.model("Points", pointsSchema);

module.exports = Points;
