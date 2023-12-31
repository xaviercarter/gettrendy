////////////////////////////////////////////////////////////////////////////////
// requires                                                                   //
////////////////////////////////////////////////////////////////////////////////
const express = require("express");
const {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchPostCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
} = require("../../controllers/comments/commentCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const commentRoutes = express.Router();

////////////////////////////////////////////////////////////////////////////////
// routes                                                                     //
////////////////////////////////////////////////////////////////////////////////
commentRoutes.post("/", authMiddleware, createCommentCtrl);
commentRoutes.get("/", authMiddleware, fetchAllCommentsCtrl);
commentRoutes.get("/:id", authMiddleware, fetchCommentCtrl);
commentRoutes.put("/:id", authMiddleware, updateCommentCtrl);
commentRoutes.get("/post/:id", authMiddleware, fetchPostCommentsCtrl);
commentRoutes.delete("/:id", authMiddleware, deleteCommentCtrl);

////////////////////////////////////////////////////////////////////////////////
// exports                                                                    //
////////////////////////////////////////////////////////////////////////////////
module.exports = commentRoutes;
