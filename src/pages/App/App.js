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
import { signUp } from "../../utilities/users-service";
import MyProfile from '../../components/MyProfile/MyProfile.jsx';

function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();
  const [gUser, setGuser] = useState({
    name: '',
    email: '',
    googleId: '',
    imageUrl: '',
    password: ''
  });
  const responseGoogle = (response) => {
    console.log("Login Google fail", response.ow);
  }

  const loginGoogle = async (response) => {
    setGuser({
      name: response.profileObj.name,
      email: response.profileObj.email,
      googleId: response.googleId,
      imageUrl: response.profileObj.imageUrl,
      password: ''
    })
    navigate('/signup/google')
  }


  const reset = (e) => {
    e.preventDefault();
    setUser(null);
    setGuser({
      name: '',
      email: '',
      googleId: '',
      imageUrl: '',
      password: ''
    });
  }
console.log("guser", gUser)
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
        <Route path="/signup/google" element={!gUser.googleId?null:<MyProfile to="/myposts" gUser={gUser} setGuser={setGuser}/>}/>
        <Route path="/auth/google" element={user?<Navigate to="/myposts" />:null}/>
        <Route path="/" element={user?<Navigate to="/myposts" />:null}/>
        {/* <Route path="/login" element={user?<Navigate to="/myposts" />:null}/> */}
        {/* <Route path="/signup" element={<SignUpForm setUser={setUser} navigate={navigate}/>}/> */}
        <Route path="/myposts" element={user?<MyPostsPage/>:null}/> 
        <Route path="/favorites" element={user?<FavoritePage user={user} />:null}/>
        <Route path="/allposts" element={user?<AllPostsPage user={user}/>:null}/>
        <Route path="/allposts/post/:id" element={user?<FullPostPage user={user}/>:null}/>
        <Route path="/create" element={user?<CreatePostPage/>:null}/>
        <Route path="/userposts/:id" element={user?<UserPostsPage user={user}/>:null}/>
      </Routes>
      <button onClick={reset}>Logout</button>
      <ToastContainer />
    </div>
  );
}

export default App;
