const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const dbConnect = require("./config/db/dbConnect");

const app = express();

// database
dbConnect();

// register
app.post("/api/users/register", (req, res) => {
    res.json({ user: "User Registered" });
});

// login
app.post("/api/users/login", (req, res) => {
    res.json({ user: "User Login" });
});

// fetch all user
app.get("/api/users", (req, res) => {
    res.json({ user: "fetch all user" });
});

// console .env
console.log(process.env);

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running ${PORT}`));