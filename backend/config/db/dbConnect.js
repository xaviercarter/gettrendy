const mongoose = require('mongoose');

// connect database
const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://xdc129:DFnwLOLcsKcaadUK@gettrendy.4omtehn.mongodb.net/?retryWrites=true&w=majority",{
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