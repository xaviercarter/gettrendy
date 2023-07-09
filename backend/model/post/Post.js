const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post title is required"],
        trim: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "User is required"],
    },

    description: {
        type: String,
        required: [true, "Post description is required"],
    },

    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519_1280.jpg",
    },
},{
    toJSON:{
        virtuals: true,
    },
    toObject:{
        virtuals: true,
    },
    timestamps: true,
}
);


// compile model from schema
const Post = mongoose.model('Post', postSchema);
module.exports = Post;