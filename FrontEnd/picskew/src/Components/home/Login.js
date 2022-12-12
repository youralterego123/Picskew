import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './home.css'
import viewer from '../Viewer/Viewer'
import uploderhome from '../Uploaer/Uploderhome'
import { Link, json } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
export default function Login() {
  let navigate = useNavigate();
  const [loginrecord,setloginrecord]=useState([]);
  const [logindetails,setLogindetails]=useState([
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
  setLogindetails({...logindetails,[e.target.name]:val})
  
  
}

  const insertFunction = async (e) => {
    e.preventDefault();
     const result=await axios.post('http://localhost:8080/user/login',logindetails)
     .then((result) => {
      console.log("Record received")
      console.log(result.data)
      //setloginrecord(result)
      if(result.data===''){
        alert("Wrong password or User does not exists")
      }
      else{
      if(result.data[0].role==='viewer'){
        const id=result.data[0].id;
        
        navigate('/viewer',{state:{id:id}})
      }
      else{
        const id=result.data[0].id;
        navigate('/uploder',{state:{id:id}})
      }
    }
  })

    
  }
  window.history.forward();

  function noBack() {

    window.history.forward();

}

  
  
    return (
        <center>
          
        <div className="loginform">
        
        <Form onSubmit={insertFunction} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="formlabel">Email address</Form.Label>
        <Form.Control className="inputtype" name="email" value={logindetails.email} onChange={(e) => changeDetails(e)} type="email" placeholder="Enter email" required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="formlabel">Password</Form.Label>
        <Form.Control className="inputtype"  name="password" value={logindetails.password} onChange={(e) => changeDetails(e)} type="password" placeholder="Password" required />
      </Form.Group>
      <Button className="loginbtn" variant="success" type="submit" name="loginbtn" >
        Log In
      </Button><br/>
      <Link  to='/Signup'> <Button  variant="primary" className="signupbtn">
           Sign up</Button></Link>
           
     </Form>
     
        </div>
       
        </center>
    )
}
