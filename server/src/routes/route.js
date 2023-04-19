import {
  addPost,
  deletePost,
  getPost,
  getPostWithID,
  updatePost,
} from '../controllers/controller';

const routes = app => {
  app
    .route('/postDetails')
    .get((req, res, next) => {
      // middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getPost)
    .post(addPost);
  app
    .route('/customer/:customerID')
    .get(getPostWithID)
    .put(updatePost)
    .delete(deletePost);
};

export default routes;
