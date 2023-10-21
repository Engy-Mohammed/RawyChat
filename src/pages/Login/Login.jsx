import React, { useState } from "react";
import "./login.scss";
import hi from '../../assets/imges/astronaut.png'
import {auth} from '../../firebase/config'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [err,setErr] = useState(false);

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
     await signInWithEmailAndPassword(auth, email, password);
     navigate('/');
    } catch (err) {
      setErr(true);
    }
    
  }
  return (
    <>
      <div className="formWrapper">
        <span className="logo">Rawy Chat</span>
        <span className="title">Login</span>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
           <div>
           <img src={hi} alt="img" />
           </div>
          <button>Sign in</button>
          {err && <span> Something Wrong ...</span>}
        </form>
        <p>
          You don't have an account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </>
  );
}
