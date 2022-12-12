import React, { useState,useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './Uploderhome.css'
export default function Uploderhome() {
    const [studentrecord,setStudentrecord]=useState([]);
    const location = useLocation();
    const [imagerecord,setImagerecord]=useState([]);
    useEffect(() => {
       
        fetch("http://localhost:8080/user/viewer/"+location.state.id)
        .then(result => result.json())
        .then((result) => {
            console.log("Record received")
            console.log(result)
            setStudentrecord(result)
        })

    fetch("http://localhost:8080/image/imagebyuser/"+location.state.id)
    .then(result=>result.json())
    .then((result) => {
      setImagerecord(result)
    })
    }, [])
    const deleteFunction = (id) => {
      axios.delete('http://localhost:8080/image/delete/'+ id)
      window.location.reload();
 }
 window.history.forward();

    function noBack() {

      window.history.forward();

  }
    return (
        <div className="entirebody">
           <Navbar  className="navbarstyle">
      <Container>
        <Navbar.Brand className="navbartextstyle" >PicSkew</Navbar.Brand>
        <Navbar.Text className="navbartextstyle">
          
               {studentrecord && studentrecord.map(sturec => (
                <div key={sturec.id}>
                 <Link to={`/createpost/${sturec.id}`}><Button variant="outline-success">Create Post</Button></Link>
                </div>))}
          </Navbar.Text>
        
       
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          
          <Dropdown  as={ButtonGroup}>
          {studentrecord && studentrecord.map(sturec => (
                <div key={sturec.id}>
                <Button className="dropdownbutton" >Signed in as {sturec.name}</Button>
               
                </div>))}
        
        <Dropdown.Toggle split className="dropdownbutton" id="dropdown-custom-2" />
        <Dropdown.Menu className="super-colors">
          <Dropdown.Item ><Link to={'/'} className="linkstyle">Log out</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Table striped bordered  >
      <thead>
        <tr >
          <th>Caption</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

      {imagerecord && imagerecord.map(imgrec => (
       
        <tr className="tablecss" key={imgrec.id}>
          
          <td>{imgrec.caption}</td>
          <td><Link to={`/view/${imgrec.id}`} className="btn btn-success" variant="success">View Post</Link>{' '}
               <Link to={`/edit/${imgrec.id}`} className="btn btn-warning">Edit Post</Link>{' '}
               <Button variant="danger" onClick={() => deleteFunction(imgrec.id)}>Delete Post</Button>{' '}
              </td>
        </tr>
        
                ))
              }
           
      </tbody>
    </Table>
        </div>
    )
}
