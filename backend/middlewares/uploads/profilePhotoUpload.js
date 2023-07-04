const multer = require('multer');

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

module.exports = { profilePhotoUpload };