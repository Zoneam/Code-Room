import './App.css';
import { useState } from 'react';
import { Route, Routes } from "react-router";
import CreatePostPage from '../CreatePostPage/CreatePostPage.jsx'
import { getUser } from '../../utilities/users-service';
import Navbar from '../../components/Navbar/Navbar.jsx'
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import MyPostsPage from '../MyPostsPage/MyPostsPage.jsx'
import AllPostsPage from '../AllPostsPage/AllPostsPage.jsx'
import FullPostPage from '../FullPostPage/FullPostPage.jsx'
import { useNavigate, Navigate } from "react-router-dom";
import UserPostsPage from '../UserPostsPage/UserPostsPage.jsx';
import FavoritePage from '../FavoritePage/FavoritePage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@leecheuk/react-google-login';
import * as userApi from '../../utilities/users-api'

function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log(response.ow);
    
  }

  const loginGoogle = (response) => {
    console.log(response);
    setUser(response)
  }

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser}/>
      <GoogleLogin
        clientId="764068031463-lc5idq1aolb23g0tstc50n1g4sreac25.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={loginGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
      <Routes>
        <Route path="/auth/google" element={user?<Navigate to="/myposts" />:<LoginForm setUser={setUser}/>}/>
        <Route path="/" element={user?<Navigate to="/myposts" />:<LoginForm setUser={setUser}/>}/>
        <Route path="/login" element={user?<Navigate to="/myposts" />:<LoginForm setUser={setUser}/>}/>
        <Route path="/signup" element={<SignUpForm setUser={setUser} navigate={navigate}/>}/>
        <Route path="/myposts" element={user?<MyPostsPage/>:<LoginForm setUser={setUser}/>}/>
        <Route path="/favorites" element={user?<FavoritePage user={user} />:<LoginForm setUser={setUser}/>}/>
        <Route path="/allposts" element={user?<AllPostsPage user={user}/>:<LoginForm setUser={setUser}/>}/>
        <Route path="/allposts/post/:id" element={user?<FullPostPage user={user}/>:<LoginForm setUser={setUser}/>}/>
        <Route path="/create" element={user?<CreatePostPage/>:<LoginForm setUser={setUser}/>}/>
        <Route path="/userposts/:id" element={user?<UserPostsPage user={user}/>:<LoginForm setUser={setUser}/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
