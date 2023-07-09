const expressAsyncHandler = require("express-async-handler");

const Post = require('../../model/post/Post');
const validateMongodbId = require("../../utils/validateMongodbID");
const User = require("../../model/user/User");
const cloudinaryUploadImg = require("../../utils/cloudinary");

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  console.log({file:req.body});
  const { _id } = req.user;
  // validateMongodbId(req.body.user);


  // get the path to the image
  // const localPath = `public/images/posts/${req.file.filename}`;
  // upload the image to cloudinary
  // const imgUploaded = await cloudinaryUploadImg(localPath);
  try {
    const post = await Post.create({
      ...req.body,
      // image: imgUploaded?.url, 
      user: _id,
    });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// remove uploaded image from public folder using fs module


////////////////////////////////////////////////////////////////////////
//Fetch all posts                                                     //
////////////////////////////////////////////////////////////////////////

const fetchPostsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({}).populate('user');
    res.json(posts);
  } catch (error) { }
});

////////////////////////////////////////////////////////////////////////
//Fetch a single post                                                 //
////////////////////////////////////////////////////////////////////////
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id).populate('user');
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

////////////////////////////////////////////////////////////////////////
//Update posts                                                        //
////////////////////////////////////////////////////////////////////////

const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  console.log({ body: req.body, res });
  const { id } = req.params;
  validateMongodbId(id);

  try {

    const post = await Post.findByIdAndUpdate(id, {
      ...req.body,
      user: req.user?._id,
    },
      {
        new: true,
      });
    res.json(post);
  } catch (error) {
    res.json(error);

  }
});


////////////////////////////////////////////////////////////////////////
//Delete posts                                                        //
////////////////////////////////////////////////////////////////////////

const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findOneAndDelete(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});


module.exports = {
  deletePostCtrl,
  updatePostCtrl,
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
};