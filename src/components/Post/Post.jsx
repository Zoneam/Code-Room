import CodeEditor from "@uiw/react-textarea-code-editor";
import Badge from "react-bootstrap/Badge";
import "./Post.css";
import { Link } from "react-router-dom";

export default function Post({ post, handleLock, handleDelete }) {
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(post.code);
  };
  return (
    <>
      <div
        className="all-posts-page"
        style={{
          width: "100%",
          margin: "50px auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "60%" }} className="wrapper">
          <div className="post-wrapper">
            <Badge className="post-badge" bg="primary">
              {post.title}
            </Badge>
            <div>
              <span className="post-span-f">
                <i
                  onClick={() => handleLock(post._id)}
                  className={
                    post.public
                      ? "fa-solid fa-lock-open fa-xl lock"
                      : "fa-solid fa-lock fa-xl lock"
                  }
                />
              </span>
              <span>
                <i
                  onClick={() => handleDelete(post._id, post.title)}
                  className="fa-solid fa-rectangle-xmark fa-xl close-button"
                ></i>
              </span>
            </div>
            <div>
              <button
                type="button"
                onClick={handleCopy}
                className="btn btn-outline-light btn-sm copy-btn"
              >
                Copy
              </button>
            </div>
          </div>
          <Link
            to={`/allposts/post/${post._id}`}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <CodeEditor
              className="code-editor"
              value={post.code}
              language="js"
              placeholder="Please enter JS code."
              padding={15}
            />
          </Link>
          <div className="post-bottom-div">
            <span style={{ marginLeft: "10px" }}>{post.description}</span>
          </div>
        </div>
      </div>
    </>
  );
}
