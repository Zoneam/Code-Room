import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api";
import Post from "../../components/Post/Post";
import './MyPostsPage.css';

export default function MyPostsPage() {
  const [myPosts, setMyPosts] = useState([]);
  useEffect(function () {
    async function getPosts() {
      const posts = await postsAPI.getMyPosts();
      setMyPosts(posts.reverse());
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
    console.log("Id", posts);
  };

  const posts = myPosts.map((myPost, i) => {
    return (
      <div className='my-posts-psge-wrapper' key={i}>
        <Post
          myPost={myPost}
          key={i}
          handleLock={handleLock}
          handleDelete={handleDelete}
        />
      </div>
    );
  });
  return <>{posts.length ? posts : <h1> NO SNIPPETS YET!</h1>}</>;
}
