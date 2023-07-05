const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        required: [true, "First name is required"],
        type: String,
    },
    lastName: {
        required: [true, "Last name is required"],
        type: String,
    },
    profilePhoto: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_1280.png",
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },

    isAdmin: { 
        type: Boolean,
        default: false,
    },

    role: {
        type: String,
        enum: ["Admin", "Guest", "Blogger"],
    },

    isAccountVerified: { type: Boolean, default: true },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,

    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
    // to be used for virtuals and adding id functinality to track users
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);


// method to populate created posts
userSchema.virtual('posts', {
    ref: 'Post',
    foreignField: 'user',
    localField: '_id',
});

// hash password 
userSchema.pre('save', async function (next) {
    // allow to make changes to the password only if the password has been modified
    if (!this.isModified('password')) {
        next();
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
}); 

// match password append our owm method on the userschema
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


// schema into model
const User = mongoose.model("User", userSchema);

// export the model so user can be used in other files
module.exports = User;