import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";


export default function Post() {
  const [code, setCode] = useState(`function add(a, b) 
  
  function add(a, b) {\n  return a + b;\n}
  
  function add(a, b) {\n  return a + b;\n}
  {\n  return a + b;\n}`);




  return (
    <>
    <div style={{width:'60%'}}>
        <div style={{display:'flex',justifyContent: 'space-between'}}>
            <span>Title</span>
            <span>Snippet by Hayk</span>

        </div>

        <CodeEditor
            value={code}
            language="js"
            placeholder="Please enter JS code."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            style={{
            fontSize: 12,
            backgroundColor: "#0D004D",
            fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
        />
        <span>18 Likes</span>
        <span>11 Comments</span>
      </div>
    </>
  );
}
