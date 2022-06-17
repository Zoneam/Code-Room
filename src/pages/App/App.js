import './App.css';
import { useState } from 'react';
import { Route, Routes } from "react-router";
import CreatePostPage from '../CreatePostPage/CreatePostPage'
import { getUser } from '../../utilities/users-service';
import Navibar from '../../components/Navbar/Navbar'
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import MyPostsPage from '../MyPostsPage/MyPostsPage'
import AllPostsPage from '../AllPostsPage/AllPostsPage'
import FullPostPage from '../FullPostPage/FullPostPage'
import { useNavigate, Navigate } from "react-router-dom";
import UserPostsPage from '../UserPostsPage/UserPostsPage';

function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  return (
    <div className="App">
     
      
      <Navibar user={user} setUser={setUser}/>

      <Routes>
      <Route path="/" element={user?<Navigate to="/myposts" />:<LoginForm setUser={setUser}/>}/>
        <Route path="/login" element={user?<Navigate to="/myposts" />:<LoginForm setUser={setUser}/>}/>
        <Route path="/signup" element={<SignUpForm setUser={setUser} navigate={navigate}/>}/>
        <Route path="/myposts" element={<MyPostsPage/>}/>
        <Route path="/allposts" element={<AllPostsPage user={user}/>}/>
        <Route path="/allposts/post/:id" element={<FullPostPage/>}/>
        <Route path="/create" element={<CreatePostPage/>}/>
        <Route path="/userposts/:id" element={<UserPostsPage user={user}/>}/>

      </Routes>
    </div>
  );
}

export default App;
