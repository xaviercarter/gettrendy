const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
// storage
const multerStorage = multer.memoryStorage();

// file type checking 
const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(
        {
            message: 'Unsupported file type',
        }, 
        false
    );
    }
    
};

const profilePhotoUpload = multer({ 
    storage: multerStorage, 
    fileFilter: multerFilter,
    limits:{fileSize: 1000000 },
});

// image resizing
const profilePhotoResize = async (req, res, next) => {
    // check if there is no file 
    if(!req.file) return next();
    // renaming file
    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
    await sharp(req.file.buffer).resize(250, 250).toFormat('jpeg').jpeg({quality: 90}).toFile(path.join(`public/images/profile/${req.file.filename}`));
    next();
}  

module.exports = { profilePhotoUpload, profilePhotoResize };