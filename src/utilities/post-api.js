import sendRequest from './send-request';

const BASE_URL = '/api/posts';


export function getAllPublicPosts() {
  return sendRequest(`${BASE_URL}/allposts`);
}


export function createNewPost(post) {
  console.log("---***")
  let title = post.title;
  let description = post.description;
  let code = post.code;
  console.log(code)
  return sendRequest(`${BASE_URL}/create`, 'POST', { title, description, code  });
}