import React, { useState,useContext, useEffect } from 'react';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const history=useHistory()
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  const [password,setPassword]=useState('');
  const {firebase} = useContext(FirebaseContext)


  const [validation, setValidation] = useState({
    username: "",
    email: "",
    phone:"",
    password: "",
  });




  
  const checkValidation = (e) => {
    
  //  e.preventDefault()
    let errors = validation;

    //first Name validation
    if (!username.trim()) {
      errors.username= " name is required";
    } else {
      errors.username = "";
    }
    

    // email validation
    // const emailCond =
    //   "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
    if (!email.trim()) {
      errors.email = "Email is required";
    // } else if (!email.match(emailCond)) {
    //   errors.email = "Please ingress a valid email address";
    } else {
      errors.email = "";
    }

    //mobilenumber validation

    if (!phone.trim()) {
      errors.phone= "phone number is required";
    }
     else if (phone.length < 10 && phone.length >10) {
    errors.phone = "Password must be  10 characters";
     } else {
     errors.phone = "";
     }




    //password validation
    const cond1 = "/^(?=.*[a-z]).{6,10}$/";
    // const cond2 = "/^(?=.*[A-Z]).{6}$/";
    // const cond3 = "/^(?=.*[0-9]).{6}$/";
    

    if (password=='') {
      errors.password = "password is required";
    } else if (password.length < 6)    {
      errors.password = "Password must be at least 6  characters";
   
    } else if (password.length >10 )    {
      errors.password = "Password must be at most 10 characters"; 
    
    }else if (!password.match(cond1)) {
      errors.password = "Password must contain at least one lowercase";
    // } else if (!password.match(cond2)) {
    //   errors.password = "Password must contain at least one capital letter";
    // } else if (!password.match(cond3)) {
    //   errors.password = "Password must contain at least a number";
    // } else {
      errors.password = "";
    }

    

    setValidation(errors);
  };

 useEffect(()=>{
  checkValidation()
 },[{username,email,phone,password}])

// const validation=()=>{
//   checkValidation()

// }




const handleSubmit=(e)=>{

   
  e.preventDefault()
  // console.log("fghj",firebase);

  try{
  firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
    // console.log("mnbv");

    result.user.updateProfile({displayName:username}).then(()=>{
    // console.log("sdfv");

       firebase.firestore().collection('users').add({
        id:result.user.uid,
        username:username,
        phone:phone
        
      })
      .then(()=>{
        console.log("iiii");
          history.push('/login')

      })
      // console.log("uyg",user);  
    // console.log("sdfghjk");
    })
    
  })
}
catch(error){
  alert("Enter the inputs")
   
}

}




  return (
    <div>
      <div className="signupParentDiv">
        <img  style={{width:"200px" ,height:"200px" }} src={Logo} alt="img"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
           {validation.username && <p style={{color:"red"}}>{validation.username}</p>}

          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            id="email"
            name="email"
          />
           {validation.email && <p style={{color:"red"}}>{validation.email}</p>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            id="lname"
            name="phone"
          />
           {validation.phone && <p style={{color:"red"}}>{validation.phone}</p>}

          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            id="lname"
            name="password"
          />
           {validation.password && <p style={{color:"red"}}>{validation.password}</p>}

          <br />
          <br />
          <button onClick={{validation}}>Signup</button>
        </form>
        <a href='/login'>Login</a>

      </div>
    </div>
  );
}
