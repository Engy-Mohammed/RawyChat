import React, { useState  } from "react";
import "./register.scss";
import Add from "../../assets/imges/image.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate ,Link } from "react-router-dom";

export default function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    console.log(displayName);
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage,displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate('/')
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <>
      <div className="formWrapper">
        <span className="logo">Rawy Chat</span>
        <span className="title">Register</span>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <label htmlFor="file">
            <img src={Add} alt="img" />
            <span>Add an Avatar</span>
          </label>
          <input type="file" id="file" />
          <button>Sign Up</button>
          {err && <span> Something Wrong ...</span>}
        </form>
        <p>
          You do have an account ? <Link to='/login'>Login</Link>
        </p>
      </div>
    </>
  );
}
