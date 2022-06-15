import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";
import {  useParams } from "react-router-dom";
import * as postsAPI from "../../utilities/post-api";
import { useEffect} from "react";

export default function CreatePostPage() {
  const [post, setPost] = useState({
    code:''
  });
  const params = useParams();

  useEffect(function() {
      async function getPost() {
        const post = await postsAPI.getPost(params.id);
        setPost(post[0]);
      }
      getPost();
    },[]);

  console.log(post.code)
    return (
      <>
        <div style={{ width: "90%", margin: "50px auto" }}>
            <CodeEditor
              language="js"
              placeholder="Paste snipped here"
              value={post.code}
              name="code"
              padding={15}
              disabled
              style={{
                fontSize: 12,
                backgroundColor: "#0D004D",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            />
        </div>
      </>
    );
  }
  