import React, { useState,useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './view.css'
import { useNavigate } from 'react-router'
import Button from 'react-bootstrap/Button';

export default function View() {
    const {id}=useParams()
    let navigate = useNavigate();
    const [imagerec,setImagerec]=useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/image/view/"+id)
        .then(result => result.json())
        .then((result) => {
            console.log("Record received")
            console.log(result)
            setImagerec(result)
            
        })
    }, [])

    function topage(){
        navigate('/uploder',{state:{id:imagerec.uploaderid}})
    }
    return (
        <div>
            <center> 
                <div className="cardposition">
            <Card className="viewcard" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={process.env.PUBLIC_URL + `/images/${imagerec.imagename}`} />
      <Card.Body>
        <Card.Title className="imagetitle">Image by {imagerec.uploadername}</Card.Title>
        <Card.Text className="imagetitle">
        {imagerec.caption}
        </Card.Text>
        <Button className="homebtn" onClick={() => topage()}>Home</Button>
      </Card.Body>
    </Card>
    </div>
    </center>
  
        
        </div>
    )
}
