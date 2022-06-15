import { useState, useEffect} from "react";
import * as postsAPI from '../../utilities/post-api';
import Post from '../../components/Post/Post'

export default function MyPostsPage() {
    const [myPosts, setMyPosts] = useState([]);


    
    useEffect(function() {
        async function getPosts() {
          const posts = await postsAPI.getMyPosts();
          
          setMyPosts(posts.reverse());
        }
        getPosts();
      },[]);


      const posts = myPosts.map((myPost,i) => {
         return( 
         <div key={i} style= {{width:'100%', margin:'50px auto', display: 'flex', justifyContent: 'center', }}>
            <Post myPost={myPost} key={i}/>
          </div>
        )
      })
    return(

        <> 
            {posts.length?posts:<h1> NO SNIPPETS YET!</h1>}
        </>
    )}