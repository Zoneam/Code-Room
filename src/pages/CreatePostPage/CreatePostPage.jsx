import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import * as postAPI from '../../utilities/post-api';

export default function CreatePostPage() {
    const[post, setPost] = useState({
        code:'',
        title:'',
        description:'',
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
    
        setPost({...post, [e.target.name]:e.target.value})
    
    }

const  handleSave = async (e) => {
    e.preventDefault();
    await postAPI.createNewPost(post);
    navigate('/')
}

return (
    <>
    <div style= {{width:'70%', margin:'50px auto'}}>
    <Form className='NewSkillForm' onSubmit={(e) => handleSave(e)}>
      <InputGroup size="lg">
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm" placeholder="Title" value={post.title} name='title' onChange={handleChange}/>
      </InputGroup>

      <CodeEditor
            value={post.code}
            language="js"
            placeholder="Please enter Snipped Here"
            onChange={handleChange}
            name='code'
            padding={15}
            style={{
            fontSize: 12,
            backgroundColor: "#0D004D",
            fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
        />

    <FloatingLabel
        controlId="floatingTextarea"
        label="Description"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Description" value={post.description} name='description' onChange={handleChange} />
      </FloatingLabel>

      <Button variant="primary" type="submit" size="lg" >
        Save
      </Button>
      </Form>
        </div>
    </>

)}