import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api";
import PublicPost from "../../components/PublicPost/PublicPost.jsx";
import { useParams } from "react-router-dom";
import "./UserPostsPage.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify';

export default function UserPostsPage({ user }) {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const likedSuccessfully = () => toast.success("Added to Favorites!",  {position: toast.POSITION.BOTTOM_RIGHT});
  const dislikedSuccessfully = () => toast.error("Removed from Favorites!", {position: toast.POSITION.BOTTOM_RIGHT});

  useEffect(function () {
    async function getPosts() {
      const userPosts = await postsAPI.getUserPosts(params.id);
      setUserPosts(userPosts.reverse());
      setLoading(false);
    }
    getPosts();
  }, []);

  async function handleLike(postId, authorId) {
    const userPosts = await postsAPI.addLike(postId, authorId);
    console.log(userPosts)
    setUserPosts(userPosts.reverse());
    if (userPosts.find((post) => post._id === postId).likes.users.includes(user._id)){
      console.log(userPosts)
      likedSuccessfully();
    } else {
      dislikedSuccessfully();
    }
  }

  const posts = userPosts.map((post, i) => {
    return (
      <div key={i} className="user-posts-page-wrapper">
        <PublicPost post={post} key={i} handleLike={handleLike} user={user} />
      </div>
    );
  });
 
  return (
    <>
      {!isLoading ? (
        posts ? posts : <h1>No Posts Yet</h1>
      ) : (
        <Button variant="primary" disabled style={{ margin: "15%" }}>
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
