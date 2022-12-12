import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'
import './createpost.css'
export default function Createpost() {
    let navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const [imageData, setImageData] = useState(null);
    const { id } =useParams()
    const [uploaderinfo,setUploaderinfo]=useState([]);
    const [imageName, setImageName] = useState("");
    const[imagecaption,setImagecaption]=useState("");
    const [uploaderid,setUploaderid]=useState();
    const [uploadername,setUploadername]=useState("");
    useEffect(() => {
        fetch(`http://localhost:8080/user/viewer/${id}`)
        .then(result => result.json())
        .then((result) => {
            setUploaderid(result[0].id)
            setUploadername(result[0].name)
            console.log(result)
            
        })
    }, [])
    const handleUploadClick = event => {
        let file = event.target.files[0];
        const imageData = new FormData();
        imageData.append('imageFile', file);
        setImageData(imageData);
    }
    const uploadImageWithAdditionalData = (event) => {
        event.preventDefault();
        imageData.append('imageName', imageName);
       
        imageData.append('imagecaption',imagecaption);
        imageData.append('uploaderid',uploaderid);
        console.log(uploaderid)
        imageData.append('uploadername',uploadername);
        console.log(uploadername)
        uploadImage();
    }
   
    const handleChange = event => {
        setImagecaption(event.target.value)
        console.log(imagecaption)
        setImageName(event.target.value)
    }
    const uploadImage = async () => {
        
        if (imageData.entries().next().value[1] !== null) {
             const response = await axios.post('http://localhost:8080/image/createpost', imageData)
              .then((response)=>{
                console.log(response)   
                if(response==1)
                   console.log("inside if")
                   navigate('/uploder',{state:{id:uploaderid}})
        
               })
        }
        
        }
        function topage(){
            navigate('/uploder',{state:{id:uploaderid}})
        }
    return (
        <div>
            <center>
            <Form onSubmit={uploadImageWithAdditionalData} className="loginform2">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Caption</Form.Label>
        <Form.Control name="caption"  onChange={(e) => handleChange(e)} type="text" placeholder="Enter caption" required />
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Choose Image</Form.Label>
        <Form.Control name="images" accept="image/*" onChange={(e) => handleUploadClick(e)} type="file" required />
        

      </Form.Group>
      </Form.Group>

      <Button variant="success" className="createsubmit" type="submit"  name="createpost" >
        Submit
      </Button><br/>
      <Button variant="danger" className="createcancel" type="button"  name="editpost"  onClick={() => topage()}>
        Cancel
      </Button>
     
    </Form>
    </center>
        </div>
    )
}
