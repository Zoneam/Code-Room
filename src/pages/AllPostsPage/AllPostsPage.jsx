import { useState, useEffect} from "react";
import * as postsAPI from '../../utilities/post-api';
import PublicPost from '../../components/PublicPost/PublicPost'


export default function AllPostsPage({user}) {
    const [allPosts, setAllPosts] = useState([]);

    useEffect(function() {
        async function getPosts() {
          const allPosts = await postsAPI.getAllPosts();
          setAllPosts(allPosts.reverse());
        }
        getPosts();
      },[]);


    async function handleLike(postId) { 
        const allPosts = await postsAPI.addLike(postId);
        setAllPosts(allPosts.reverse());
      }

      const posts = allPosts.map((post,i) => {
         return( 
         <div key={i} style= {{width:'100%', margin:'50px auto', display: 'flex', justifyContent: 'center', }}>
            <PublicPost myPost={post} key={i} handleLike={handleLike} user={user}/>
          </div>
        )
      })
    return(

        <> 
            {posts.length?posts:<h1> NO SNIPPETS YET!</h1>}
        </>
    )}