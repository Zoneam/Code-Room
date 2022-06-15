import './App.css';
import { useState } from 'react';
import { BrowserRouter as Link, Switch } from "react-router-dom";
import { Route, Routes } from "react-router";
import CreatePostPage from '../CreatePostPage/CreatePostPage'
import { getUser } from '../../utilities/users-service';
import Navibar from '../../components/Navbar/Navbar'
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Post from '../../components/Post/Post'
import MyPostsPage from '../MyPostsPage/MyPostsPage'
import AllPostsPage from '../AllPostsPage/AllPostsPage'

function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    <div className="App">
     
      
      <Navibar user={user} setUser={setUser}/>

      <Routes>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/myposts" element={<MyPostsPage/>}/>
        <Route path="/allposts" element={<AllPostsPage/>}/>
        <Route path="/favorites" element={<CreatePostPage/>}/>
        <Route path="/create" element={<CreatePostPage/>}/>
      </Routes>


    </div>
  );
}

export default App;
