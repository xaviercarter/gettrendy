const expressAsyncHandler = require("express-async-handler");

const Post = require('../../model/post/Post');
const validateMongodbId = require("../../utils/validateMongodbID");
const User = require("../../model/user/User");
const cloudinaryUploadImg = require("../../utils/cloudinary");

const createPostCtrl = expressAsyncHandler(async (req, res) => {
    console.log(req.file);
    const { _id} = req.user;
    // validateMongodbId(req.body.user);


// get the path to the image
const localPath = `public/images/posts/${req.file.filename}`;
// upload the image to cloudinary
const imgUploaded = await cloudinaryUploadImg(localPath);
    try {
        const post = await Post.create({
            ...req.body, 
            image: imgUploaded?.url, 
            user: _id,
        }); 
        res.json(post);
    } catch (error) {
        res.json(error);
    }
});

module.exports = { createPostCtrl };