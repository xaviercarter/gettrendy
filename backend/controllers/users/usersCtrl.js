
const expressAsyncHandler = require("express-async-handler");
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
// check if user already exists
    const user = await User.findOne({ email: req?.body?.email });

    if(!user) {
        throw new Error("login credentials not found");
    }
    res.json("user login");
});

module.exports = { userRegisterCtrl, loginUserCtrl };