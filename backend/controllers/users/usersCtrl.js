const User = require("../../model/user/User");

// register 


const userRegisterCtrl = async (req, res) => {
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
};

module.exports = { userRegisterCtrl };