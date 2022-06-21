import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api";
import PublicPost from "../../components/PublicPost/PublicPost";
import { useParams } from "react-router-dom";
import "./UserPostsPage.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

export default function UserPostsPage({ user }) {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);

  const [userPosts, setUserPosts] = useState([]);
  useEffect(function () {
    async function getPosts() {
      const userPosts = await postsAPI.getUserPosts(params.id);
      setUserPosts(userPosts.reverse());
      setLoading(false);
    }
    getPosts();
  }, []);

  async function handleLike(postId, authorId) {
    const userPosts = await postsAPI.addUserLike(postId, authorId);
    setUserPosts(userPosts.reverse());
  }

  const posts = userPosts.map((post, i) => {
    return (
      <div key={i} className="user-posts-page-wrapper">
        <PublicPost myPost={post} key={i} handleLike={handleLike} user={user} />
      </div>
    );
  });
  return (
    <>
      {!isLoading ? (
        posts
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
