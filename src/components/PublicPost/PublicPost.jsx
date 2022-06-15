import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";
import Badge from 'react-bootstrap/Badge';


import 'font-awesome/css/font-awesome.min.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function Post({myPost, handleLike}) {



  console.log(myPost._id)
  return (
    <>
    <div style={{width:'60%'}}>
        <div style={{display:'flex',justifyContent: 'space-between'}}>
            <Badge bg="primary" style={{position: 'relative',zIndex: '15',left: '10px',top: '12px'}}>{myPost.title}</Badge>
            <div>
              <i className="fa-regular fa-comment" >3</i>
              <i className="fa-regular fa-heart" onClick={() => handleLike(myPost._id)}>{myPost.likes.users.length}</i>
              <Badge bg="secondary">Post By {myPost.author.name}</Badge>
            </div>
        </div>

        <CodeEditor
            value={myPost.code}
            language="js"
            placeholder="Please enter JS code."
            padding={15}
            style={{
            fontSize: 12,
            maxHeight: '200px',
            backgroundColor: "#0D004D",
            overflowY: 'scroll',
            fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
        />
        <div style={{border: '2px solid gray'}}>
            <span>{myPost.description}</span>
        </div>

      </div>
    </>
  );
}
