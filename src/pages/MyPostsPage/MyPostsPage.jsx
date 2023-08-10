import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api";
import Post from "../../components/Post/Post.jsx";
import "./MyPostsPage.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify';

export default function MyPostsPage() {
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const deletedSuccessfully = (title) => toast.success(`${title} deleted successfully!`,  {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000});
  const lockedSuccessfully = () => toast.success("You Made this Post Private!",  {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000});
  const unlockedSuccessfully = () => toast.success("You Made this Post Public!",  {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000, theme: "dark"});
  const serverError = () => toast.error("Server Error!",  {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000});

  useEffect(function () {
    async function getPosts() {
      const posts = await postsAPI.getMyPosts();
      setMyPosts(posts.reverse());
      setLoading(false);
    }
    getPosts();
  }, []);
  console.log(myPosts)

  const handleLock = async (id) => {
    try {
      const posts = await postsAPI.addLock(id);
      setMyPosts(posts.reverse());
      if (posts.find((post) => post._id === id).public === true){
        unlockedSuccessfully();
      } else {
        lockedSuccessfully();
      }
    }
    catch (error) {
      serverError();
      console.error('Error updating post', error);
    }
  };

  const handleDelete = async (id, title) => {
    try {
      const deletedPost = await postsAPI.deletePost(id);
      setMyPosts(myPosts.filter((post) => post._id !== deletedPost._id));
      deletedSuccessfully(title);
    }
    catch (error) {
      serverError();
      console.error('Error updating post', error);
    }
  };

  const posts = myPosts.map(myPost => <Post post={myPost} key={myPost._id} handleLock={handleLock} handleDelete={handleDelete}/>);
  
  return (
    <>
      {!isLoading ? (
        posts.length ? posts : <h1>No Posts Yet</h1>
      ) : (
        <Button variant="primary" disabled style={{margin:'15%'}}>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      )}
    </>
  );
}
