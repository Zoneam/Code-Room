import CodeEditor from "@uiw/react-textarea-code-editor";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import "./PublicPost.css";

export default function Post({ myPost, handleLike, user }) {
  const handleCopy = (e) => {
    navigator.clipboard.writeText(myPost.code);
  };

  return (
    <>
      <div style={{ width: "60%" }}>
        <div className="public-outer-wrapper">

          <Badge className="public-badge" bg="primary" style={{ boxShadow: 'rgb(25 25 25) 3px 2px 3px'}}>
            {myPost.title}
          </Badge>
          <Link
            to={`/userposts/${myPost.author._id}`}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <div className="public-code-wrapper">
              <i
                className="fa-solid fa-user fa-xl"
                style={{ marginTop: "15px", color: "rgb(46 0 255)" }}
              >
                {" "}
              </i>
              <span
                style={{ display: "block", fontSize: "12px", marginTop: "2px" }}
              >
                {myPost.author.name}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  lineHeight: "0",
                  position: "relative",
                  top: "-10px",
                }}
              >
                {myPost.dateCreated.split("T")[0]}
              </span>
            </div>
          </Link>

          <div
            style={{ height: "24px", alignItems: "center", display: "flex" }}
          >
            <button
              type="button"
              onClick={handleCopy}
              className="btn btn-outline-light btn-sm copy-btn"
            >
              Copy
            </button>
            <i
              className={
                myPost.likes.users.includes(user._id)
                  ? "fa-xl fas fa-heart srtik"
                  : "fa-xl fas fa-heart-broken srtik"
              }
              style={{ marginRight: "3px", cursor: "pointer", color: "red", textShadow: 'rgb(92 83 80 / 56%) 2px 2px 2px' }}
              onClick={() => handleLike(myPost._id, myPost.author._id)}
            ></i>
            <span
              style={{ color: "black", fontSize: "24px", marginRight: "15px" }}
            >
              {" " + myPost.likes.users.length}
            </span>
            <i
              className="fa-regular fa-comment fa-xl"
              style={{ marginRight: "3px",textShadow: 'rgb(92 83 80 / 56%) 2px 2px 2px' }}
            ></i>
            <span
              style={{ color: "black", fontSize: "24px", marginRight: "8px"}}
            >
              {" " + myPost.comments.length}
            </span>
          </div>
        </div>
        <Link
          to={`/allposts/post/${myPost._id}`}
          style={{
            cursor: "pointer",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <CodeEditor
            className="code-editor"
            value={myPost.code}
            language="js"
            placeholder="Please enter JS code."
            padding={15}
            disabled
          />
        </Link>
        <div
          style={{
            border: "7px solid #0e004d",
            borderRadius: "0 0 15px 15px",
            textAlign: "left",
            backgroundColor: "#fffdea",
            minWidth: "600px",
            padding: "7px",
          }}
        >
          <span style={{ marginLeft: "10px" }}>
            {myPost.description}{" "}
            <span
              style={{
                position: "relative",
                float: "right",
                marginRight: "10px",
              }}
            ></span>
          </span>
        </div>
      </div>
    </>
  );
}
