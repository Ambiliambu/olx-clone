import React, { useState ,useContext, useEffect} from 'react';
import { FirebaseContext } from '../../store/Context'; 
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory} from 'react-router-dom'
function Login() {
  const history=useHistory()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {firebase} =useContext(FirebaseContext)


  const [validation, setValidation] = useState({
 
    email: "",
   
    password: "",
  });


  const checkValidation = (e) => {
    

    let errors = validation;

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


    //password validation
    const cond1 = "/^(?=.*[a-z]).{6}$/";
    // const cond2 = "/^(?=.*[A-Z]).{6}$/";
    // const cond3 = "/^(?=.*[0-9]).{6}$/";
    

    if (password==='') {
      errors.password = "password is required";
    } else if (password.length < 6 && password.length > 6)    {
      errors.password = "Password must be  6 characters";
   
    } else if (!password.match(cond1)) {
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



    useEffect(() => {
      checkValidation();
    }, [email,password]);
  



  const handleLogin=(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
    }).catch((error)=>{
      alert("Enter the inputs")
    })
  }


  return (
    <div>
      <div className="loginParentDiv">
        <img style={{width:"200px", height:"200px" }} src={Logo} alt="img"></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            id="fname"
            name="email"
          />
           {validation.email && <p style={{color:"red"}}>{validation.email}</p>}

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
          <button>Login</button>
        </form>
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;
