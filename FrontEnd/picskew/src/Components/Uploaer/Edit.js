import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'
import './edit.css'
export default function Createpost() {
    let navigate = useNavigate();
    const [imageData, setImageData] = useState("");
    const { id } =useParams()
    const [imageinfo,setImageinfo]=useState([]);
    const[imagecaption,setImagecaption]=useState("");
    useEffect(() => {
        fetch(`http://localhost:8080/image/view/${id}`)
        .then(result => result.json())
        .then((result) => {
            setImageinfo(result)
            
        })
    }, [])
   
    const uploadImageWithAdditionalData = async (event) => {
        event.preventDefault();
        const imageData = new FormData();
        imageData.append("imagecaption",imagecaption)
       console.log(imagecaption)
       setImageData(imageData)
        
        
       const result=await axios.put(`http://localhost:8080/image/edit/${id}`,imageData)
       .then((result)=>{
        console.log(result)   
        if(result==1)
           console.log("inside if")
           navigate('/uploder',{state:{id:imageinfo.uploaderid}})

       })
    }
   
    const handleChange = e => {
        
        setImagecaption(e.target.value)
        console.log(imagecaption)
        
        
        console.log(id)
    }
    function topage(){
        navigate('/uploder',{state:{id:imageinfo.uploaderid}})
    }
    
    return (
        <div>
            <Form onSubmit={uploadImageWithAdditionalData}>
            <Form.Group className="mb-3" >
           <img className="editimage" src={process.env.PUBLIC_URL + `/images/${imageinfo.imagename}`}/>
        </Form.Group>
          <center>  
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Edit caption</Form.Label>
        <Form.Control  className="forminput" name="caption"  placeholder={imageinfo.caption}  onChange={(e) => handleChange(e)} type="text" required/>
      </Form.Group>
</center>
      <Button variant="success" type="submit"  name="editpost" >
        Save changes
      </Button>
      <Button variant="danger" className="mx-3" type="button"  name="editpost"  onClick={() => topage()}>
        Cancel
      </Button>
     
    </Form>
        </div>
    )
}