import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/Navigation/NavBar";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";
import UpdatePost from "./components/Posts/update/UpdatePost";
import PostDetails from "./components/Posts/PostDetail/Details";
import UpdateComment from "./components/Posts/PostDetail/comment/UpdateComment";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/create-post' component={CreatePost} />
        <Route exact path='/update-post/:id' component={UpdatePost} />
        <Route exact path='/update-comment/:id' component={UpdateComment} />
        <Route exact path='/post-details/:id' component={PostDetails} />
        <Route exact path='/posts' component={PostsList} />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
