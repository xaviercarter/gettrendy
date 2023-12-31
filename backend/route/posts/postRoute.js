const express = require('express');
const { createPostCtrl, 
        fetchPostsCtrl, 
        fetchPostCtrl, 
        updatePostCtrl, 
        deletePostCtrl,
    } = require('../../controllers/posts/postCtrl');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { 
    photoUpload,
    postImgResize,
    
} = require('../../middlewares/uploads/photoUpload');

const postRoute = express.Router();

postRoute.post(
    '/', 
    authMiddleware, 
    photoUpload.single('image'), 
    postImgResize,
    createPostCtrl,
    updatePostCtrl,
    deletePostCtrl,
);

postRoute.get('/', fetchPostsCtrl);
postRoute.get('/:id', fetchPostCtrl);
postRoute.put('update/:id', authMiddleware, updatePostCtrl);
postRoute.delete('/:id', authMiddleware, deletePostCtrl);




module.exports = postRoute;