import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PostDetailsSchema = new Schema({
  username: {
    type: String,
  },
  profile_pic: {
    type: String,
  },
  fileUrl: {
    type: String,
  },
  liked: {
    type: Boolean,
  },
  post_liked: {
    type: Number,
  },
  caption: {
    type: String,
  },
  comments: {
    type: Array,
  },
});
