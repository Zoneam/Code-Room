import CodeEditor from "@uiw/react-textarea-code-editor";
import { Link } from "react-router-dom";
import "./PublicPost.css";
import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";

export default function Post({ post, handleLikeDislike, user }) {
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(post.code);
  };
  const authorName =
    post.author.name.length > 10
      ? post.author.name.slice(0, 7) + "..."
      : post.author.name;
  const dateCreated = post.dateCreated
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");
  const likeIconClass = post.likes.includes(user._id)
    ? "fa-xl fas fa-heart srtik"
    : "fa-xl fas fa-heart-broken srtik";
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
          <div className="public-outer-wrapper">
            <Badge
              className="public-badge"
              bg="primary"
              style={{ boxShadow: "rgb(25 25 25) 3px 2px 3px" }}
            >
              {post.title}
            </Badge>
            <Link
              to={`/allposts/${post.author._id}`}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <OverlayTrigger
                delay={{ hide: 250, show: 0 }}
                overlay={(props) => (
                  <Tooltip {...props}>{post.author.name}</Tooltip>
                )}
                placement="top"
              >
                <div
                  
                  className="public-code-wrapper"
                >
<i
                  className="fa-solid fa-user fa-xl"
                  style={{ marginTop: "15px", color: "rgb(46 0 255)" }}
                >
                  {" "}
                </i>

                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      marginTop: "2px",
                    }}
                  >
                    {authorName}
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
                    {dateCreated}
                  </span>
                </div>
              </OverlayTrigger>
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
                className={likeIconClass}
                style={{
                  marginRight: "3px",
                  cursor: "pointer",
                  color: "red",
                  textShadow: "rgb(92 83 80 / 56%) 2px 2px 2px",
                }}
                onClick={() => handleLikeDislike(post._id)}
              ></i>
              <span
                style={{
                  color: "black",
                  fontSize: "24px",
                  marginRight: "15px",
                }}
              >
                {" " + post.likes.length}
              </span>
              <i
                className="fa-regular fa-comment fa-xl"
                style={{
                  marginRight: "3px",
                  textShadow: "rgb(92 83 80 / 56%) 2px 2px 2px",
                }}
              ></i>
              <span
                style={{ color: "black", fontSize: "24px", marginRight: "8px" }}
              >
                {" " + post.comments.length}
              </span>
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
            className="wrapper"
          >
            <span style={{ marginLeft: "10px" }}>
              {post.description}{" "}
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
      </div>
    </>
  );
}
