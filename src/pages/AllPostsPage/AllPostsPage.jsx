import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import * as postsAPI from "../../utilities/post-api";
import PublicPost from "../../components/PublicPost/PublicPost";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import "./AllPostsPage.css";
import { toast } from 'react-toastify';
const {log} = console;

export default function AllPostsPage({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const likedSuccessfully = () => toast.success("Added to Favorites!",  {position: toast.POSITION.BOTTOM_RIGHT});
  const dislikedSuccessfully = () => toast.error("Removed from Favorites!", {position: toast.POSITION.BOTTOM_RIGHT});

  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(true);

  useEffect(function () {
    async function getPosts() {
      const params = new URLSearchParams(location.search);
      const page = parseInt(params.get('page'));
      const response = await postsAPI.getAllPosts(page);
      setAllPosts(response.posts.reverse());
      setTotalPages(response.totalPages);
      setLoading(false);
    }
    getPosts();
  }, [location]);

  async function handleLike(postId) {
    const updatedPost = await postsAPI.addLike(postId);
    log(updatedPost)
    setAllPosts((prevPosts) => prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post)));
    if (updatedPost.likes.includes(user._id)){
      likedSuccessfully();
    } else {
      dislikedSuccessfully();
    }
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    navigate(`/allposts?page=${page}`);
  }

  const posts = allPosts.map(post => <PublicPost post={post} key={post._id} handleLike={handleLike} user={user} />);

  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(<Button key={i} variant={i === currentPage ? "primary" : "secondary"} onClick={() => handlePageChange(i)}>{i}</Button>);
  }

  return (
    <>
      {!isLoading ? (
        <>
          {posts.length ? (<>{posts}<div className="pagination">{pageLinks}</div></>) : (<h1>No Posts Yet</h1>)}</>
      ) : (<Button variant="primary" disabled style={{ margin: "15%" }}><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>Loading...</Button>)}
    </>
  );
}
