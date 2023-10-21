import React, { useContext } from 'react'
import './navbar.scss'
import Search from './../Search/search'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { authContext } from '../../context/authContext'
export default function Navbar() {

    const {currentUser} = useContext(authContext);
    
    return (
        <>
            <div className='navbar'>
                <div className='userContent'>
                <span className="logo">Rawy Chat</span>
                <div className='user'>
                    <img src={currentUser.photoURL} alt="img" />
                    <span>{currentUser.displayName}</span>
                    <button onClick={()=>signOut(auth)}>Logout</button>
                </div>
                </div>
                <Search/>
            </div>
        </>
    )
}
