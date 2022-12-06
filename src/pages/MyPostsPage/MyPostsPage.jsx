import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api";
import Post from "../../components/Post/Post";
import "./MyPostsPage.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

export default function MyPostsPage() {
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
  };

  const handleDelete = async (id) => {
    const posts = await postsAPI.deletePost(id);
    setMyPosts(posts.reverse());
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
        posts
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
