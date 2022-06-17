import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as postsAPI from '../../utilities/post-api';
import Card from 'react-bootstrap/Card';

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
  if(comment !== ''){
    const post = await postsAPI.addComment(params.id, comment);
    setPost(post);
    setComment('')
  }
}
const handleCopy = (e) => {
  navigator.clipboard.writeText(post.code);
};

  useEffect(function () {
    async function getPost() {
      const post = await postsAPI.getPost(params.id);
      setPost(post[0]);
    }
    getPost();
  }, []);
  console.log(post)
  console.log(post.author)

  return (
    <>
      <div style={{ width: "90%", margin: "50px auto",  }}>
      <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            border: "7px solid #0e004d",
            borderRadius: "15px 15px 0 0",
            backgroundColor: "#fffdea",
            minWidth:"600px",
       
          }}
        >
          <p style={{marginLeft: '8px'}}>{post.description}</p>
      </div>

      <div style={{position:"relative"}}>
<button type="button" onClick={handleCopy} className="btn btn-outline-light btn-sm" style={{cursor: "pointer", position: "absolute", right:'0.5rem', top:'o.5rem',zIndex:'15'}}>Copy</button>

        <CodeEditor
          language="js"
          placeholder="Paste snipped here"
          value={post.code}
          name="code"
          padding={15}
          disabled
          style={{
            fontSize: 12,
            minWidth:"600px",
            backgroundColor: "#0D004D",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />

       </div>
        <InputGroup className="mb-3" style={{minWidth:"600px",}}>
          <Form.Control
          value={comment}
          onChange={handleChange}
            placeholder="Comment"
            aria-label="Comment"
          />
          <Button variant="primary" id="button-addon2" onClick={handleAddComment} required>
            Add Comment
          </Button>
        </InputGroup>
      </div>
      <div style={{width:'60%',margin:'50px auto'}}>
      {post.comments.map((c,i) => {
        return (
              <Card key={i} style={{margin:'50px auto'}}>
          <Card.Header><div style={{display:'flex',justifyContent:'space-between'}}><span>Comment by {c.username}</span>  <span>{c.dateCreated.split("T")[0]}</span></div></Card.Header>
          
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p style={{textAlign:'left'}}>
                {c.commentText}
              </p>
             
            </blockquote>
          </Card.Body>
        </Card>
        )
      })
        } 
        </div>   
        </>
  );
}
