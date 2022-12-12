
import React, { useState,useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './viewer.css';


export default function Viewer() {

    const [studentrecord,setStudentrecord]=useState([]);
    const [imagerecord,setImagerecord]=useState([]);
    const location = useLocation();
    const [quotes,setQuotes]=useState('');
    
    useEffect(() => {
       
        fetch("http://localhost:8080/user/viewer/"+location.state.id)
        .then(result => result.json())
        .then((result) => {
            console.log("Record received")
            console.log(result)
            setStudentrecord(result)
        })
        fetch("http://localhost:8080/image/viewall/")
        .then(result => result.json())
        .then((result) => {
            console.log("Record received")
            console.log(result)
            setImagerecord(result)
        })
        display();
    }, [])
    window.history.forward();

    function noBack() {

      window.history.forward();

  }
   function display(){
    const quotes=['Photography is an austere and blazing poetry of the real.','Photography is the story that people fail to put into words.','When words become unclear, people shall focus with photographs. When images become inadequate, people shall be content with silence.','The negative is the equivalent of the composer’s score and the print the performance.','Photography is a way of feeling, of touching, of loving. What you have caught on film is captured forever… It remembers little things, long after you have forgotten everything.']
    const selectrandom=quotes[Math.floor(Math.random() * quotes.length)];
    setQuotes(selectrandom);
     
   }
    return (
        <div className="entirebody">
           <Navbar className="navbarstyle">
      <Container>
        <Navbar.Brand className="navbartextstyle">PicSkew</Navbar.Brand>
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
     <p className="displayquotes">Quote of the day: "{quotes}"</p>
     <Row xs={1} md={4} className="g-4 mx-1 my-2">
  
      {imagerecord && imagerecord.map(imgrec => (
          
        <Col key={imgrec.id}>
          <Card className="cardstyle">
          
          <Card.Img className="imagesize" variant="top" src={process.env.PUBLIC_URL + `/images/${imgrec.imagename}`} />
            <Card.Body>
           <Card.Title className="imagetitle">Image by {imgrec.uploadername}</Card.Title>
              <Card.Text className="imagetitle">
                {imgrec.caption}<br/><br/>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
     
    </Row>
    
  
        </div>
    )
}
