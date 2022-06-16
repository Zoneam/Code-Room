import CodeEditor from "@uiw/react-textarea-code-editor";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

export default function Post({ myPost, handleLike, user }) {

  const handleCopy = (e) => {
    navigator.clipboard.writeText(myPost.code);
  };

  return (
    <>
      <div style={{ width: "60%" }}>
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
          <Badge
            bg="primary"
            style={{
              position: "relative",
              zIndex: "15",
              left: "10px",
              top: "12px",
            }}
          >
            {myPost.title}
          </Badge>
          <div
            style={{
              border: "4px solid #0e004d",
              boxShadow: " 4px 7px 14px 0px rgba(0,0,0,0.59)",
              width: "80px",
              height: "80px",
              position: "absolute",
              top: "-140%",
              right: " 50%",
              zIndex: "15",
              borderRadius: "50%",
              backgroundColor: "beige",
            }}
          >
            <i className="fa-solid fa-user fa-xl" style={{ marginTop: "15px" }}>
              {" "}
            </i>
            <span
              style={{ display: "block", fontSize: "12px", marginTop: "2px" }}
            >
              {myPost.author.name}
            </span>
          </div>
          <div>
          <button type="button" onClick={handleCopy} className="btn btn-outline-light btn-sm" style={{cursor: "pointer", position: "absolute", right:'0.5rem', top:'1.9rem',zIndex:'15'}}>Copy</button>
            <i
              className="fa-regular fa-comment fa-xl"
              style={{ marginRight: "20px" }}
            >
              {" " + myPost.comments.length}
            </i>
            <i 
              className={myPost.likes.users.includes(user._id)? "fa-xl fas fa-heart": "fa-xl fas fa-heart-broken"}
              
              style={{ marginRight: "10px", cursor: "pointer" }}
              onClick={() => handleLike(myPost._id)}
            >
              {" " + myPost.likes.users.length}
            </i>
          </div>
        </div>
        <Link
          to={`./post/${myPost._id}`}
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          <CodeEditor
            value={myPost.code}
            language="js"
            placeholder="Please enter JS code."
            padding={15}
            disabled
            style={{
              fontSize: 12,
              minWidth:"600px",
              maxHeight: "200px",
              backgroundColor: "#0D004D",
              overflowY: "auto",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </Link>
        <div
          style={{
            border: "7px solid #0e004d",
            borderRadius: "0 0 15px 15px",
            textAlign: "left",
            backgroundColor: "#fffdea",
            minWidth:"600px",
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
            >
              {myPost.dateCreated.split("T")[0]}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
