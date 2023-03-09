import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
import { signUp } from "../../utilities/users-service";
import MyProfile from '../../components/MyProfile/MyProfile.jsx';

function App() {
  const [user, setUser] = useState(getUser()? getUser(): null);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  // Local login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      window.location.href = '/';
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  // const responseGoogle = (response) => {
  //   console.log("Login Google fail", response.ow);
  // }

  const handleGoogleLoginSuccess = async (googleUser) => {
    
    const idToken = googleUser.getAuthResponse().id_token;
    setUser(googleUser.profileObj)
    console.log("idToken", idToken)
  };

  const handleGoogleLoginFailure = (err) => {
    console.log('Failed to log in with Google:', err);
  };
console.log("user", user)
  return (
    <div className="App">
      <Navbar user={user} setUser={setUser}/>

      <GoogleLogin
        clientId="764068031463-lc5idq1aolb23g0tstc50n1g4sreac25.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
        cookiePolicy={'single_host_origin'}
        redirectUri="/auth/google"
      />

      <Routes>
        {/* <Route path="/signup/google" element={!gUser.googleId?null:<MyProfile to="/myposts" />}/> */}
        {/* <Route path="/auth/google" element={user?<Navigate to="/myposts" />:null}/> */}
        <Route path="/" element={user?<Navigate to="/myposts" />:null}/>
        <Route path="/login" element={user?<Navigate to="/myposts" />:null}/>
        <Route path="/signup" element={<SignUpForm setUser={setUser} navigate={navigate}/>}/>

        <Route path="/myposts" element={user?<MyPostsPage/>:null}/> 
        <Route path="/favorites" element={user?<FavoritePage user={user} />:null}/>
        <Route path="/allposts" element={user?<AllPostsPage user={user}/>:null}/>
        <Route path="/allposts/post/:id" element={user?<FullPostPage user={user}/>:null}/>
        {/* <Route path="/create" element={user?<CreatePostPage/>:null}/> */}
        {/* <Route path="/userposts/:id" element={user?<UserPostsPage user={user}/>:null}/> */}
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
