import React, { Fragment, useContext, useEffect, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/Context'
import { useHistory } from 'react-router-dom';

const Create = () => {
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState(null)
  const date =new Date()
  const history=useHistory()




  const [validation, setValidation] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
  
  });

  const checkValidation = () => {
    
    // e.preventDefault()
     let errors = validation;
 
     if (!name.trim()) {
       errors.name= " name is required";
     } else {
       errors.name = "";
     }
     
 
     
     if (!category.trim()) {
       errors.category= "category is required";   
     }else if(category.length<3){
     errors.phone = "Enter valid category";
      
     }
      else {
       errors.category = "";
     }
 
 
     if (!price.trim()) {
       errors.price= "price is required";
     }
      else if (price < 100) {
     errors.price = "Enter valid price";
      } else {
      errors.price = "";
      }
 

     if (image==null) {
       errors.image = "image is required";
     } else    {
       errors.image = "";
    
     }
 
     
    //  virtualincubation
     setValidation(errors);
   };


  



  const handleSubmit=(e)=>{
      
  e.preventDefault()
     try{

      firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
        ref.getDownloadURL().then((url)=>{
          console.log(url);
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId:user.uid,
            createdAt:date.toDateString()
          })
                history.push('/')
             
        
        })
       })


     }catch(error){

      alert("Enter the inputs")
      
      
      // setValidation(error)

     }
         
  }

  useEffect(()=>{
    checkValidation()
   },[{name,category,price,image}])

   




  return (
    <Fragment>
      <Header />
      <form >
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              id="fname"
              name="Name"
            />
           {validation.name && <p style={{color:"red"}}>{validation.name}</p>}

            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
             onChange={(e)=>{setCategory(e.target.value)}}
              id="fname"
              name="category"
            />
           {validation.category && <p style={{color:"red"}}>{validation.category}</p>}

            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input" 
            type="number" 
            value={price}
            onChange={(e)=>{setPrice(e.target.value)}}
            id="fname" 
            name="Price" />
           {validation.price && <p style={{color:"red"}}>{validation.price}</p>}

            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image): ""}></img>
          
            <br />
            <input onChange={(e)=>{
                 setImage(e.target.files[0])
            }} type="file" />

           {validation.image && <p style={{color:"red"}}>{validation.image}</p>}

            <br />
            <button onClick={handleSubmit}  className="uploadBtn">upload and Submit</button>
          
        </div>
      </form>
    </Fragment>
  );
};

export default Create;
