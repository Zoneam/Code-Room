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

export function getAllPosts() {
  return sendRequest(`${BASE_URL}/allposts`);
}

export function addLike(postId) {
  return sendRequest(`${BASE_URL}/like/${postId}`, 'PUT');
}

export function getPost(id) {
  return sendRequest(`${BASE_URL}/allposts/post/${id}`);
}

export function addComment(id, comment) {
  return sendRequest(`${BASE_URL}/post/${id}`, 'POST', { comment });
}