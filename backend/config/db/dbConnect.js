const mongoose = require('mongoose');

// connect database
const dbConnect = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URL,
        {
            
            // useCreateIndex:true,
            // useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("database is connected successfully");
    } catch (error) {
        console.log(`error ${error.message}`);
    }
};

module.exports = dbConnect;