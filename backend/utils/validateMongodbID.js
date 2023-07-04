const mongoose = require('mongoose');

const validateMongodbID = id => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error('User id Invalid ID');
};

module.exports = validateMongodbID;