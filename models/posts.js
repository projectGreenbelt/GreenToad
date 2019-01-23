const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
  post: String,
  date: { type: Date, default: Date.now },
  userName: { type: String, default: "Guest" }
});

const Posts = mongoose.model("Posts", postsSchema);

module.exports = Posts;
