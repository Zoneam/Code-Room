import { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/post-api";
import PublicPost from "../../components/PublicPost/PublicPost";
import { useParams } from "react-router-dom";
import './UserPostsPage.css';

export default function UserPostsPage({ user }) {
  const params = useParams();

  const [userPosts, setUserPosts] = useState([]);
  useEffect(function () {
    async function getPosts() {
      const userPosts = await postsAPI.getUserPosts(params.id);
      setUserPosts(userPosts.reverse());
    }
    getPosts();
  }, []);

  async function handleLike(postId, authorId) {
    const userPosts = await postsAPI.addUserLike(postId, authorId);
    setUserPosts(userPosts.reverse());
  }

  const posts = userPosts.map((post, i) => {
    return (
      <div key={i} className='user-posts-page-wrapper'>
        <PublicPost myPost={post} key={i} handleLike={handleLike} user={user} />
      </div>
    );
  });
  return <>{posts.length ? posts : <h1> NO SNIPPETS YET!</h1>}</>;
}
