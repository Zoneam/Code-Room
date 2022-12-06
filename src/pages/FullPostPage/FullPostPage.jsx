import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState,useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as postsAPI from "../../utilities/post-api";
import Card from "react-bootstrap/Card";
import "./FullPostPage.css";

export default function CreatePostPage({ user }) {
  const [post, setPost] = useState({
    code: "",
    comments: [],
  });
  const params = useParams();
  const inputRef = useRef();

  const handleAddComment = async (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    if (inputValue !== "") {
      const post = await postsAPI.addComment(params.id, inputValue);
      setPost(post);
      inputRef.current.value = "";
    }
  };
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(post.code);
  };

  const handleDeleteComment = async (id) => {
    const post = await postsAPI.deleteComment(id);
    setPost(post);
  }

  useEffect(function () {
    async function getPost() {
      const post = await postsAPI.getPost(params.id);
      setPost(post);
    }
    getPost();
  }, []);

  return (
    <>
      <div style={{ width: "90%", margin: "50px auto" }}>
        <p>By {post.author?.name}</p>
        <div className="full-post-page-header">
          <p style={{ marginLeft: "8px" }}>{post.description}</p>
        </div>
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={handleCopy}
            className="btn btn-outline-light btn-sm copy-btn-full">
            Copy
          </button>
          <CodeEditor
            language="js"
            placeholder="Paste snipped here"
            value={post.code}
            name="code"
            padding={15}
            disabled
            style={{
              fontSize: 12,
              minWidth: "600px",
              backgroundColor: "#0D004D",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </div>
        <InputGroup className="mb-3" style={{ minWidth: "600px" }}>
          <Form.Control
          ref={inputRef}
            placeholder="Comment"
            aria-label="Comment"
            maxLength="400"
            required
            style={{backgroundColor: "antiquewhite"}}
          />
          <Button
            variant="primary"
            id="button-addon2"
            onClick={handleAddComment}
            required
          >
            Add Comment
          </Button>
        </InputGroup>
      </div>
      <div style={{ width: "60%", margin: "50px auto" }}>
        {post.comments.map((c, i) => {
          return (
            <Card key={i} style={{ margin: "50px auto" }}>
              <Card.Header>
            {user._id === c.author ? (
                <span>
                  <i onClick={() => handleDeleteComment(c._id)} className="fa-solid fa-rectangle-xmark fa-xl delete-comment"></i>
                </span>
            ):''}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Comment by {c.username}</span>{" "}
                  <span>{c.dateCreated.split("T")[0].split('-').reverse().join('/')}</span>
                </div>
              </Card.Header>
              <Card.Body style={{backgroundColor: "antiquewhite"}}>
                <blockquote className="blockquote mb-0" >
                  <p style={{ textAlign: "left" }}>{c.commentText}</p>
                </blockquote>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
}
