const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const { errorHandler, notFound } = require("./middleware/error/errorHandler");

const app = express();

// database
dbConnect();

// middleware
app.use(express.json());



// users route
app.use('/api/users', userRoutes);



// console .env
// console.log(process.env);

// err handler
app.use(notFound); // this needs to be ran first as it indicates a 404 error for path not found then will run the next error handler
app.use(errorHandler);


// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running ${PORT}`));