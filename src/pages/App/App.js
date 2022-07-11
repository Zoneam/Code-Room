import './App.css';
import { useState } from 'react';
import { Route, Routes } from "react-router";
import CreatePostPage from '../CreatePostPage/CreatePostPage'
import { getUser } from '../../utilities/users-service';
import Navbar from '../../components/Navbar/Navbar'
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import MyPostsPage from '../MyPostsPage/MyPostsPage'
import AllPostsPage from '../AllPostsPage/AllPostsPage'
import FullPostPage from '../FullPostPage/FullPostPage'
import { useNavigate, Navigate } from "react-router-dom";
import UserPostsPage from '../UserPostsPage/UserPostsPage';
import FavoritePage from '../FavoritePage/FavoritePage';

function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser}/>
      <Routes>
      <Route path="/" element={user?<Navigate to="/myposts" />:<LoginForm setUser={setUser}/>}/>
        <Route path="/login" element={user?<Navigate to="/myposts" />:<LoginForm setUser={setUser}/>}/>
        <Route path="/signup" element={<SignUpForm setUser={setUser} navigate={navigate}/>}/>
        <Route path="/myposts" element={user?<MyPostsPage/>:<LoginForm setUser={setUser}/>}/>

        <Route path="/favorites/:userId" element={user?<FavoritePage user={user} />:<LoginForm setUser={setUser}/>}/>

        <Route path="/allposts" element={user?<AllPostsPage user={user}/>:<LoginForm setUser={setUser}/>}/>
        <Route path="/allposts/post/:id" element={user?<FullPostPage/>:<LoginForm setUser={setUser}/>}/>
        <Route path="/create" element={user?<CreatePostPage/>:<LoginForm setUser={setUser}/>}/>
        <Route path="/userposts/:id" element={user?<UserPostsPage user={user}/>:<LoginForm setUser={setUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
