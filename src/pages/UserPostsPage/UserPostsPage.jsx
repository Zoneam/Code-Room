import { useState, useEffect} from "react";
import * as postsAPI from '../../utilities/post-api';
import PublicPost from '../../components/PublicPost/PublicPost'
import { useParams } from "react-router-dom";

export default function UserPostsPage({user}) {
    const params = useParams();
    
    const [userPosts, setUserPosts] = useState([]);
    useEffect(function() {
        async function getPosts() {
          const userPosts = await postsAPI.getUserPosts(params.id);
          setUserPosts(userPosts.reverse());
        }
        getPosts();
      },[]);

    async function handleLike(postId) { 
        const userPosts = await postsAPI.addLike(postId);
        setUserPosts(userPosts.reverse());
      }

      const posts = userPosts.map((post,i) => {
         return( 
         <div key={i} style= {{width:'100%', margin:'50px auto', display: 'flex', justifyContent: 'center', }}>
            <PublicPost myPost={post} key={i} handleLike={handleLike} user={user} />
          </div>
        )
      })
    return(
        <> 
            {posts.length?posts:<h1> NO SNIPPETS YET!</h1>}
        </>
    )}