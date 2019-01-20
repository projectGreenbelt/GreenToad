const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
  post: String,
  date: { type: Date, default: Date.now }
});

const Posts = mongoose.model("Posts", postsSchema);

module.exports = Posts;
