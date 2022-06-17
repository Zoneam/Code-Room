import CodeEditor from "@uiw/react-textarea-code-editor";
import Badge from "react-bootstrap/Badge";
import './Post.css'
import { Link } from "react-router-dom";


export default function Post({ myPost, handleLock, handleDelete }) {
  const handleCopy = (e) => {
    navigator.clipboard.writeText(myPost.code)
  };
console.log("POST COMPONENT--------")
  return (
    <>
      <div style={{ width: "60%" }}>
        <div className="post-wrapper">
          <Badge className="post-badge" bg="primary">
            {myPost.title}
          </Badge>
          <div>
          <span className="post-span-f">
            <i onClick={(e)=>handleLock(myPost._id)}
              className={
                myPost.public
                  ? "fa-solid fa-lock-open fa-xl lock"
                  : "fa-solid fa-lock fa-xl lock"
              }
            />
          </span>
          <span>
          <i onClick={(e)=>handleDelete(myPost._id)} className="fa-solid fa-rectangle-xmark fa-xl close-button"></i>
          </span>
          </div>
          <div>
          <button type="button" onClick={handleCopy} className="btn btn-outline-light btn-sm copy-btn" >Copy</button>
          </div>
        </div>
        <Link
          to={`/allposts/post/${myPost._id}`}
          style={{ cursor: "pointer", textDecoration: "none",cursor: "pointer", }}
        >
          <CodeEditor
          className='code-editor'
            value={myPost.code}
            language="js"
            placeholder="Please enter JS code."
            padding={15}
          />
        </Link>
        <div className="post-bottom-div">
          <span style={{ marginLeft: "10px" }}>{myPost.description}</span>
        </div>
      </div>
    </>
  );
}
