import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api";
import PublicPost from "../../components/PublicPost/PublicPost";
import { useParams } from "react-router-dom";
import "./FavoritePage.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";


export default function FavoritePage({ user }) {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);

  const [userFavoritePosts, setUserFavoritePosts] = useState([]);

  useEffect(function () {
    async function getFavoritePosts() { 
      const userFavoritePosts = await postsAPI.getUserFavoritePosts(user._id);
      setUserFavoritePosts(userFavoritePosts.reverse());
      setLoading(false);
    }
    getFavoritePosts();
  }, [setUserFavoritePosts]);

  async function handleLike(postId, authorId) {
    const userFavoritePosts = await postsAPI.addUserFavoriteLike(postId, authorId);
    setUserFavoritePosts(userFavoritePosts.reverse());
  }

  const posts = userFavoritePosts.map((post, i) => {
    return (
      <div key={i} className="user-posts-page-wrapper">
        <PublicPost myPost={post} key={i} handleLike={handleLike} user={user} />
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
