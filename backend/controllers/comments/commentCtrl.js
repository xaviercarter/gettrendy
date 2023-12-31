////////////////////////////////////////////////////////////////////////////////
// requires                                                                   //
////////////////////////////////////////////////////////////////////////////////

const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/Comment");
const validateMongodbId = require("../../utils/validateMongodbID");

////////////////////////////////////////////////////////////////////////////////
// create comment controller                                                  //
////////////////////////////////////////////////////////////////////////////////

const createCommentCtrl = expressAsyncHandler(async (req, res) => {
  //1.Get the user
  const user = req.user;
  //2.Get the post Id
  const { postId, description } = req.body;
  console.log(description);
  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
    res.json(comment);
  } catch (error) {
    res.status(400).json(error);
  }
});

////////////////////////////////////////////////////////////////////////////////
//fetch all comments                                                          //
////////////////////////////////////////////////////////////////////////////////

const fetchAllCommentsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({}).sort("-created");
    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});

////////////////////////////////////////////////////////////////////////////////
//comment details                                                             //
////////////////////////////////////////////////////////////////////////////////

const fetchCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const comment = await Comment.findById(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

////////////////////////////////////////////////////////////////////////////////
//post comments                                                              //
////////////////////////////////////////////////////////////////////////////////

const fetchPostCommentsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const comments = await Comment.find({ post: id });
    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});
////////////////////////////////////////////////////////////////////////////////
//update comment                                                              //
////////////////////////////////////////////////////////////////////////////////

const updateCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const update = await Comment.findByIdAndUpdate(
      id,
      {
        post: req.body?.postId,
        user: req?.user,
        description: req?.body?.description,
      },
      {
        new: true,
        runValidators: true, //run validation on update for all required fields
      }
    );
    res.json(update);
  } catch (error) {
    res.json(error);
  }
});

////////////////////////////////////////////////////////////////////////////////
//delete comment                                                              //
////////////////////////////////////////////////////////////////////////////////

const deleteCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

////////////////////////////////////////////////////////////////////////////////
//exports                                                                     //
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  deleteCommentCtrl,
  updateCommentCtrl,
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentCtrl,
  fetchPostCommentsCtrl,
};
