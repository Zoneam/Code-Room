import CodeEditor from "@uiw/react-textarea-code-editor";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

export default function Post({ myPost }) {
  console.log(myPost);
  const handleCopy = (e) => {};

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
          <span style={{marginRight:'5px'}}>{myPost.dateCreated.split('T')[0]}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CodeEditor
            value={myPost.code}
            language="js"
            placeholder="Please enter JS code."
            padding={15}
            style={{
              fontSize: 12,
              width: "100%",
              maxHeight: "200px",
              backgroundColor: "#0D004D",
              overflowY: "auto",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
          <Button
            style={{ position: "absolute", backgroundColor: "#0D004D" }}
            onClick={handleCopy}
          >
            Copy
          </Button>
        </div>

        <div
          style={{
            border: "7px solid #0e004d",
            borderRadius: "0 0 15px 15px",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#fffdea",
          }}
        >
          <span style={{ marginLeft: "10px" }}>{myPost.description}</span>
          <span style={{ marginRight: "15px" }}>
            <i
              className={
                myPost.public
                  ? "fa-solid fa-lock-open fa-xl"
                  : "fa-solid fa-lock fa-xl"
              }
            />
          </span>
        </div>
      </div>
    </>
  );
}
