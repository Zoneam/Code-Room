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
  const deletedSuccessfully = (title) => toast.success(`${title} deleted successfully!`,  {position: toast.POSITION.BOTTOM_RIGHT});
  const lockedSuccessfully = () => toast.success("You Made this Post Private!",  {position: toast.POSITION.BOTTOM_RIGHT});
  const unlockedSuccessfully = () => toast.success("You Made this Post Public!",  {position: toast.POSITION.BOTTOM_RIGHT});

  useEffect(function () {
    async function getPosts() {
      const posts = await postsAPI.getMyPosts();
      setMyPosts(posts.reverse());
      setLoading(false);
    }
    getPosts();
  }, []);

  const handleLock = async (id) => {
    const posts = await postsAPI.addLock(id);
    setMyPosts(posts.reverse());
    console.log(posts)
    if (posts.find((post) => post._id === id).public === true){
      console.log(posts)
      unlockedSuccessfully();
    } else {
      lockedSuccessfully();
    }
  };

  const handleDelete = async (id, title) => {
    const posts = await postsAPI.deletePost(id);
    setMyPosts(posts.reverse());
    deletedSuccessfully(title);
  };

  const posts = myPosts.map((myPost, i) => {
    return (
      <div className="my-posts-psge-wrapper" key={i}>
        <Post
          myPost={myPost}
          key={i}
          handleLock={handleLock}
          handleDelete={handleDelete}
        />
      </div>
    );
  });
  return (
    <>
      {!isLoading ? (
        posts.length ? posts : <h1>No Postings Yet</h1>
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
