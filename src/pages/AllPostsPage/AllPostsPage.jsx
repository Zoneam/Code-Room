import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api";
import PublicPost from "../../components/PublicPost/PublicPost";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

export default function AllPostsPage({ user }) {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
  }

  // async function handleUserClick(postId) {
  // console.log(postId)
  //   const allPosts = await postsAPI.getUserPosts(postId);
  //   setAllPosts(allPosts.reverse());
  // }

  const posts = allPosts.map((post, i) => {
    return (
      <div
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
