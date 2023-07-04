
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const User = require("../../model/user/User");


// register 
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

// user login
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user already exists
    const userFound = await User.findOne({ email });

    if (userFound && (await userFound.isPasswordMatched(password))) {
        res.json({
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


module.exports = { userRegisterCtrl, loginUserCtrl };