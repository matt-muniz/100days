const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    blogSlug: String, // String is shorthand for {type: String}
    name: String,
    comments: String,
  },
  {
    timestamps: true,
  }
);

const commentEntry = mongoose.model('CommentEntry', blogSchema);

module.exports = commentEntry;
