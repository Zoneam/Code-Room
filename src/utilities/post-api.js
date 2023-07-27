import sendRequest from './send-request';

const BASE_URL = '/api/posts';


export function getAllPublicPosts() {
  return sendRequest(`${BASE_URL}/allposts`);
}

export function createNewPost(post) {
  return sendRequest(`${BASE_URL}/create`, 'POST', { post });
}

export function getMyPosts() {
  return sendRequest(`${BASE_URL}/myposts`);
}

export function getAllPosts(page) {
  return sendRequest(`${BASE_URL}/allposts?page=${page}}`);
}

export function addLike(postId) {
  console.log("POSTID -----> ",postId)
  return sendRequest(`${BASE_URL}/like/${postId}`, 'PUT');
}

export function getPost(id) {
  return sendRequest(`${BASE_URL}/allposts/post/${id}`);
}

export function addComment(id, comment) {
  return sendRequest(`${BASE_URL}/post/${id}`, 'POST', { comment });
}

export function deleteComment(commentId) {  
  return sendRequest(`${BASE_URL}/post/${commentId}`, 'DELETE');
}

export function addLock(id) {
  return sendRequest(`${BASE_URL}/myposts/${id}`, 'PUT');
}

export function deletePost(id) {
  return sendRequest(`${BASE_URL}/myposts/${id}`, 'DELETE');
}

export function getUserPosts(postId) {
  return sendRequest(`${BASE_URL}/userposts/${postId}`);
}

export function getUserFavoritePosts() {
  return sendRequest(`${BASE_URL}/favorites`);
}
