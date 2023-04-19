import mongoose from 'mongoose';
import { PostDetailsSchema } from '../models/model';

const PostDetails = mongoose.model('PostDetails', PostDetailsSchema);

export const addPost = (req, res) => {
  let newPost = new PostDetails(req.body);

  newPost.save((err, PostDetail) => {
    if (err) {
      res.send(err);
    }
    res.json(PostDetail);
  });
};

export const getPost = (req, res) => {
  PostDetails.find({}, (err, PostDetail) => {
    if (err) {
      res.send(err);
    }
    res.json(PostDetail);
  });
};

export const getPostWithID = (req, res) => {
  PostDetails.findById(req.params.postID, (err, PostDetail) => {
    if (err) {
      res.send(err);
    }
    res.json(PostDetail);
  });
};

export const updatePost = (req, res) => {
  PostDetails.findOneAndUpdate(
    {_id: req.params.postID},
    req.body,
    {new: true},
    (err, PostDetail) => {
      if (err) {
        res.send(err);
      }
      res.json(PostDetail);
    },
  );
};

export const deletePost = (req, res) => {
  PostDetails.deleteOne({_id: req.params.postID}, (err, PostDetail) => {
    if (err) {
      res.send(err);
    }
    res.json({message: 'Successfully deleted Post'});
  });
};
