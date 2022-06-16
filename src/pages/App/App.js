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
function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div className="App">
     
      
      <Navibar user={user} setUser={setUser}/>

      <Routes>
        <Route path="/login" element={<LoginForm setUser={setUser}/>}/>
        <Route path="/signup" element={<SignUpForm setUser={setUser}/>}/>
        <Route path="/myposts" element={<MyPostsPage/>}/>
        <Route path="/allposts" element={<AllPostsPage user={user}/>}/>
        <Route path="/allposts/post/:id" element={<FullPostPage/>}/>
        <Route path="/create" element={<CreatePostPage/>}/>
      </Routes>


    </div>
  );
}

export default App;
