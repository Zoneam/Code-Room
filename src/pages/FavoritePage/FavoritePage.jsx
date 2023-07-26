import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api";
import PublicPost from "../../components/PublicPost/PublicPost.jsx";
import { useParams } from "react-router-dom";
import "./FavoritePage.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify';

export default function FavoritePage({ user }) {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [userFavoritePosts, setUserFavoritePosts] = useState([]);
  const dislikedSuccessfully = () => toast.error("Removed from Favorites !",  {position: toast.POSITION.BOTTOM_RIGHT});
  const likedSuccessfully = () => toast.success("Added to Favorites!",  {position: toast.POSITION.BOTTOM_RIGHT});

  useEffect(function () {
    async function getFavoritePosts() { 
      const userFavPosts = await postsAPI.getUserFavoritePosts();
      setUserFavoritePosts(userFavPosts.reverse());
      console.log("userFavoritePosts", userFavPosts)
      setLoading(false);
    }
    getFavoritePosts();
  }, [setUserFavoritePosts]);


  async function handleLike(postId) {
    const updatedPost = await postsAPI.addLike(postId);
    console.log("handleLike",updatedPost)
    setUserFavoritePosts((prevPosts) =>
    prevPosts.filter((post) => (post._id !== updatedPost._id ))
    );
    if (updatedPost.likes.includes(user._id)){
      likedSuccessfully();
    } else {
      dislikedSuccessfully();
    }
  }

  const posts = userFavoritePosts.map((post, i) => {
    return (
      <div key={i} className="user-posts-page-wrapper">
        <PublicPost post={post} key={i} handleLike={handleLike} user={user} />
      </div>
    );
  });
  return (
    <>
      {!isLoading ? (
        posts.length ? posts : <h1>No Favorites Yet</h1>
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
