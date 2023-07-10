import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import post from "../slices/posts/postSlices";
import comment from "../slices/comment/commentSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    post,
    comment,
  },
});

export default store;
