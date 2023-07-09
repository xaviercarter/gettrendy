import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import post from "../slices/posts/postSlices";


const store = configureStore({
    reducer: {
        users: usersReducer,
        post,
    },
});

export default store;