import CodeEditor from "@uiw/react-textarea-code-editor";
import Badge from "react-bootstrap/Badge";


export default function Post({ myPost, handleLock }) {
  console.log(myPost);
  const handleCopy = (e) => {
    navigator.clipboard.writeText(myPost.code)
  };



  return (
    <>
      <div style={{ width: "60%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "7px solid #0e004d",
            borderRadius: "15px 15px 0 0",
            backgroundColor: "#fffdea",
            minWidth:"600px",
            position: "relative",
            height: '40px',
          }}
        >
          <Badge
            bg="primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: "relative",
              zIndex: "15",
              left: "10px",
              top: "12px",
            }}
          >
            {myPost.title}
          </Badge>
          <span style={{top: '2px', marginRight: "5px",right: '0.5rem',position: 'absolute',cursor: "pointer", }}>
            <i onClick={(e)=>handleLock(myPost._id)}
              className={
                myPost.public
                  ? "fa-solid fa-lock-open fa-xl"
                  : "fa-solid fa-lock fa-xl"
              }
            />
          </span>
          <div>
          <button type="button" onClick={handleCopy} className="btn btn-outline-light btn-sm copy-btn" >Copy</button>


          </div>
        </div>
  
          <CodeEditor
          className='code-editor'
            value={myPost.code}
            language="js"
            placeholder="Please enter JS code."
            padding={15}
           
          />
        <div
          style={{
            border: "7px solid #0e004d",
            borderRadius: "0 0 15px 15px",
            textAlign: "left",
            display: "flex",
            minWidth:"600px",
            justifyContent: "space-between",
            backgroundColor: "#fffdea",
          }}
        >
          <span style={{ marginLeft: "10px" }}>{myPost.description}</span>
          
        </div>
      </div>
    </>
  );
}
