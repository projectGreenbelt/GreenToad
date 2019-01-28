const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
  post: String,
  date: { type: Date, default: Date.now },
  name: { type: String},
  picture:{type:String},
  checkInId: { type: String }
});

const Posts = mongoose.model("Posts", postsSchema);

module.exports = Posts;
