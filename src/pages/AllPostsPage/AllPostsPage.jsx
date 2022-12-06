import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api";
import PublicPost from "../../components/PublicPost/PublicPost";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import "./AllPostsPage.css";
import { toast } from 'react-toastify';

export default function AllPostsPage({ user }) {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const likedSuccessfully = () => toast.success("Added to Favorites!",  {position: toast.POSITION.BOTTOM_RIGHT});
  const dislikedSuccessfully = () => toast.error("Removed from Favorites!", {position: toast.POSITION.BOTTOM_RIGHT});

  useEffect(function () {
    async function getPosts() {
      const allPosts = await postsAPI.getAllPosts();
      setAllPosts(allPosts.reverse());
      setLoading(false);
    }
    getPosts();
  }, []);

  async function handleLike(postId) {
    const allPosts = await postsAPI.addLike(postId);
    setAllPosts(allPosts.reverse());
    if (allPosts.find((post) => post._id === postId).likes.users.includes(user._id)){
      console.log(allPosts)
      likedSuccessfully();
    } else {
      dislikedSuccessfully();
    }
  }

  const posts = allPosts.map((post, i) => {
    return (
      <div className="all-posts-page"
        key={i}
        style={{
          width: "100%",
          margin: "50px auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PublicPost myPost={post} key={i} handleLike={handleLike} user={user} />
      </div>
    );
  });
  return (
    <>
      {!isLoading ? (
        posts.length ? posts : <h1>No Posts Yet</h1>
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
