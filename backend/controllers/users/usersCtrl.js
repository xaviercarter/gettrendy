
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const User = require("../../model/user/User");
const validateMongodbID = require("../../utils/validateMongodbID");
const cloudinaryUploadImg = require("../../utils/cloudinary");

////////////////////////////////////////////////////////////////
// register                                                   //
////////////////////////////////////////////////////////////////
const userRegisterCtrl =  expressAsyncHandler(async (req, res) => {
    
    // want to check if user already exists
    const userExists = await User.findOne({ email: req?.body?.email });
    
    if(userExists) throw new Error("User already exists");


    try {
    // register user // will create what you want to create from the model
        const user = await User.create({
            firstName: req?.body?.firstName, //short hand for firstName
            lastName: req?.body?.lastName, //short hand for lastName
            email: req?.body?.email, //short hand for email
            password: req?.body?.password, //short hand for password
        });
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

////////////////////////////////////////////////////////////////
// user login                                                 //
////////////////////////////////////////////////////////////////
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user already exists
    const userFound = await User.findOne({ email });

    if (userFound && (await userFound.isPasswordMatched(password))) {
        res.json({
            _id: userFound?._id,
            firstName: userFound?.firstName,
            lastName: userFound?.lastName,
            email: userFound?.email,
            profilePhoto: userFound?.profilePhoto,
            isAdmin: userFound?.isAdmin,
            token: generateToken(userFound?._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Credentials");
    }
});

////////////////////////////////////////////////////////////////
// fetch users                                                //
////////////////////////////////////////////////////////////////
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
    console.log(req.headers);
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.json(error);
    }
});

////////////////////////////////////////////////////////////////
// delete users                                               //
////////////////////////////////////////////////////////////////
const deleteUsersCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (error) {
        res.json(error);
    }

});

////////////////////////////////////////////////////////////////
// user details                                               //
////////////////////////////////////////////////////////////////
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    // check if user id is valid
    validateMongodbID(id);
        try {
            const user = await User.findById(id);
            res.json(user);
        } catch (error) {
            res.json(error);
        }
});

////////////////////////////////////////////////////////////////
// user profile                                               //
////////////////////////////////////////////////////////////////

const userProfileCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbID(id);
    try {
        const myProfile = await User.findById(id).populate('posts'); 
        res.json(myProfile);
    } catch (error) {
        res.json(error);
    }
});

////////////////////////////////////////////////////////////////
// update profile                                               //
////////////////////////////////////////////////////////////////
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
    const { _id } = req?.user;
    validateMongodbID(_id);

    const user = await User.findByIdAndUpdate(
        _id, 
    {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        
    },
    {
        new: true, 
        runValidators: true,
    }
    );
    res.json(user);
});

////////////////////////////////////////////////////////////////
// update password                                            //
////////////////////////////////////////////////////////////////

const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
    // destructure the login user
    const { _id } = req.user;
    const { password } = req.body;
    validateMongodbID(_id);
    const user = await User.findById(_id);
    
    if (password) {
        user.password = password;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
    res.json(user);
    }
});

////////////////////////////////////////////////////////////////
// profile photo upload                                       //
////////////////////////////////////////////////////////////////

const profilePhotoUploadCtrl = expressAsyncHandler(async (req, res) => {
    // find the login user
    const { _id } = req.user;
    console.log(req.user);
    // get the path to the image
    const localPath = `public/images/profile/${req.file.filename}`;
    // upload the image to cloudinary
    const imgUploaded = await cloudinaryUploadImg(localPath);
    const foundUser = await User.findByIdAndUpdate(_id, {
        profilePhoto: imgUploaded?.url,
    }, 
    { new: true } 
    );
    res.json(foundUser);
});




////////////////////////////////////////////////////////////////
// exports ;-)                                                //
////////////////////////////////////////////////////////////////
module.exports = { 
    profilePhotoUploadCtrl,
    userRegisterCtrl, 
    loginUserCtrl, 
    fetchUsersCtrl, 
    deleteUsersCtrl,
    fetchUserDetailsCtrl,
    userProfileCtrl,
    updateUserCtrl,
    updateUserPasswordCtrl, 
};


