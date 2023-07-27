import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api";
import PublicPost from "../../components/PublicPost/PublicPost.jsx";
import "./FavoritePage.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify';

const dislikedSuccessfully = () => toast.error("Removed from Favorites !",  {position: toast.POSITION.BOTTOM_RIGHT});
const likedSuccessfully = () => toast.success("Added to Favorites!",  {position: toast.POSITION.BOTTOM_RIGHT});

export default function FavoritePage({ user }) {
  const [isLoading, setLoading] = useState(true);
  const [userFavoritePosts, setUserFavoritePosts] = useState([]);

  useEffect(() => {
    async function getFavoritePosts() { 
      try {
        const userFavPosts = await postsAPI.getUserFavoritePosts();
        setUserFavoritePosts([...userFavPosts].reverse());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts', error);
        setLoading(false);
      }
    }
    getFavoritePosts();
  }, []);


  async function handleLike(postId) {
    try {
      const updatedPost = await postsAPI.addLike(postId);
      setUserFavoritePosts((prevPosts) =>
      prevPosts.filter((post) => (post._id !== updatedPost._id ))
      );
      if (updatedPost.likes.includes(user._id)){
        likedSuccessfully();
      } else {
        dislikedSuccessfully();
      }
    } catch (error) {
      console.error('Error updating post', error);
    }
  }

  const posts = userFavoritePosts.map((post) => <PublicPost post={post} key={post._id} handleLike={handleLike} user={user} />);

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
