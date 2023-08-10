import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams} from 'react-router-dom';
import * as postsAPI from "../../utilities/post-api";
import PublicPost from "../../components/PublicPost/PublicPost";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import "./AllPostsPage.css";
import { toast } from 'react-toastify';
import { set } from "mongoose";
const { log } = console;

export default function AllPostsPage({ user }) {
  const params = useParams();
  
  const navigate = useNavigate();
  const location = useLocation();
  const likedSuccessfully = () => toast.success("Added to Favorites!",  {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000});
  const dislikedSuccessfully = () => toast.warning("Removed from Favorites!", {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000});
  const userId = params.userId || '';
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(true);


  useEffect(function () {
    async function getPosts() {
      setLoading(true);
      const pageParams = new URLSearchParams(location.search);
      const page = parseInt(pageParams.get('page') || '1');
      setCurrentPage(page);
      const response = await postsAPI.getAllPosts(page, userId);
      setAllPosts(response.posts);
      setTotalPages(response.totalPages);
      setLoading(false);
    }
    getPosts();
  }, [location, currentPage]);


  async function handleLikeDislike(postId) {
    const updatedPost = await postsAPI.addLike(postId);
    setAllPosts((prevPosts) => prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post)));
    updatedPost.likes.includes(user._id) ? likedSuccessfully() : dislikedSuccessfully();
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    navigate(`/allposts/${userId}?page=${page}`);
  }

  const posts = allPosts.map(post => <PublicPost post={post} key={post._id} handleLikeDislike={handleLikeDislike} user={user} />);

  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(<Button className="m-1" key={i} variant={i === currentPage ? "primary" : "secondary"} onClick={() => handlePageChange(i)}>{i}</Button>);
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
