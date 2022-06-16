import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as postsAPI from '../../utilities/post-api';

export default function CreatePostPage() {
  const [comment,setComment] = useState('')
  const [post, setPost] = useState({
    code: "",
    comments:[]
  });
  const params = useParams();

const handleChange = (e) => {
  setComment(e.target.value)
}


const handleAddComment = async (e) =>{
  const post = await postsAPI.addComment(params.id, comment);
  setPost(post);
  setComment('')
}


  useEffect(function () {
    async function getPost() {
      const post = await postsAPI.getPost(params.id);
      setPost(post[0]);
    }
    getPost();
  }, []);
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
        <InputGroup className="mb-3">
          <Form.Control
          value={comment}
          onChange={handleChange}
            placeholder="Comment"
            aria-label="Comment"
          />
          <Button variant="primary" id="button-addon2" onClick={handleAddComment}>
            Add Comment
          </Button>
        </InputGroup>
      </div>
      {post.comments.map((c,i) => {
        return <h1 key={i}>{c.commentText}</h1>
      })
        }    
        </>
  );
}
