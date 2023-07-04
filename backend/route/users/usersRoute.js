////////////////////////////////////////////////////////////////////////////
//REQUIRES                                                                //
////////////////////////////////////////////////////////////////////////////

const express = require('express');
const { 
    userRegisterCtrl, 
    loginUserCtrl, 
    fetchUsersCtrl,
    deleteUsersCtrl, 
    fetchUserDetailsCtrl,
    userProfileCtrl,
    updateUserCtrl,
    updateUserPasswordCtrl,
    profilePhotoUploadCtrl,
    

} = require('../../controllers/users/usersCtrl');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { 
    profilePhotoUpload, 
    profilePhotoResize,
} = require('../../middlewares/uploads/profilePhotoUpload');
const userRoutes =  express.Router();


////////////////////////////////////////////////////////////////////////////
//ROUTES                                                                  //
////////////////////////////////////////////////////////////////////////////
userRoutes.post('/register', userRegisterCtrl);
userRoutes.post('/login', loginUserCtrl);

userRoutes.put(
    '/profilephoto-upload', 
    authMiddleware, 
    profilePhotoUpload.single('image'),
    profilePhotoResize,
    profilePhotoUploadCtrl
);

userRoutes.get('/', authMiddleware, fetchUsersCtrl);
userRoutes.get('/profile/:id', authMiddleware, userProfileCtrl);
userRoutes.put('/:id', authMiddleware, updateUserCtrl); 
userRoutes.put('/password', authMiddleware, updateUserPasswordCtrl); 
userRoutes.delete('/:id', deleteUsersCtrl);
userRoutes.get('/:id', fetchUserDetailsCtrl);


////////////////////////////////////////////////////////////////////////////
//EXPORTS                                                                 //
////////////////////////////////////////////////////////////////////////////
module.exports = userRoutes; 