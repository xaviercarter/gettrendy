const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const postRoute = require("./route/posts/postRoute");
const commentRoutes = require("./route/comments/commentRoute");
const { deletePostCtrl, updatePostCtrl } = require("./controllers/posts/postCtrl");

const app = express();

// database
dbConnect();

// middleware
app.use(express.json());
app.use(cors());


// users route
app.use('/api/users', userRoutes);

// post route
app.use('/api/posts', postRoute);
app.use('/api/post/delete/:id', deletePostCtrl);
app.use('/api/post/update/:id', updatePostCtrl);


// comment routes
app.use("/api/comments", commentRoutes); 

// // err handler
app.use(notFound); // this needs to be ran first as it indicates a 404 error for path not found then will run the next error handler
app.use(errorHandler);


// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running ${PORT}`));