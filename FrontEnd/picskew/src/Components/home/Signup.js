import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './home.css'
import { Link } from 'react-router-dom';
import axios from 'axios'

import { useNavigate } from 'react-router'

export default function Login() {
    let navigate = useNavigate();
     //Creation of user json
     const [user,setUser]=useState([
        {   //Fields name should be same as the Table Coloumn name
            "id":null,
            "name":"",
            "email":"",
            "password":"",
            "role":""
        }
    ]);

    
    function changeDetails(e){
      
        let val=e.target.value;
        
        setUser({...user,[e.target.name]:val})
        
    }
    const insertFunction = async (e) => {
        e.preventDefault();
        const result=await axios.post('http://localhost:8080/user/Signup',user)
        .then((result)=>{
         console.log(result.data)   
         if(result.data===1){
            alert("Sign up successful")
            navigate('/')}
         else{
             alert("Email already exists")
         }   
 
        })
        // await axios.post('http://localhost:8080/user/Signup',user)
    }
    return (
        <center>
        <div className="loginform1">
        
        <Form onSubmit={insertFunction}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={user.name} onChange={(e) => changeDetails(e)} placeholder="Enter name" required />
      </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" value={user.email} onChange={(e) => changeDetails(e)} placeholder="Enter email" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" title="At least 1 Uppercase
At least 1 Lowercase
At least 1 Number
At least 1 Symbol, symbol allowed --> !@#$%^&*_=+-
Min 4 chars and Max 8 chars" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{4,8}$" name="password" value={user.password} onChange={(e) => changeDetails(e)} placeholder="Password" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>As a</Form.Label><br/>
      Viewer<input type="radio" className="mx-3" value="viewer" onChange={(e) => changeDetails(e)} name="role"/>

      Uploader<input type="radio" value="uploader" onChange={(e) => changeDetails(e)} name="role"/><br/>
        
      </Form.Group>
      
      <Button variant="success" type="submit" name="signupbtn" >
        Sign Up
      </Button>
       <Button variant="primary" className="mx-3" ><Link className="signuplog" to='/'>
           Log in
           </Link> </Button>
     </Form>
    
        </div>
        </center>
    )
}
