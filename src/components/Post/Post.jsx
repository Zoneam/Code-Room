import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default function Post({myPost}) {
  console.log(myPost)
const handleCopy = (e) => {
  
}


  return (
    <>
    <div style={{width:'60%'}}>
        <div style={{display:'flex',justifyContent: 'space-between'}}>
            <Badge bg="primary" style={{position: 'relative',zIndex: '15',left: '10px',top: '12px'}}>{myPost.title}</Badge>
        </div>
<div style={{display:'flex',justifyContent: 'flex-end'}}>
        <CodeEditor
            value={myPost.code}
            language="js"
            placeholder="Please enter JS code."
            padding={15}
            style={{
            fontSize: 12,
            width: '100%',
            maxHeight: '200px',
            backgroundColor: "#0D004D",
            overflowY: 'scroll',
            fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
        />
        
        <Button style={{position: 'absolute',backgroundColor: '#0D004D'}} onClick={handleCopy}>Copy</Button>
        </div>
        <div style={{textAlign:'left',border: '2px solid gray'}}>
            <span >{myPost.description}</span>
            <span>Public:{myPost.public?'True':'False'}</span>
        </div>

      </div>
    </>
  );
}
