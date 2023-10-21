import React from 'react'
import './sidebar.scss'
import Navbar from '../Navbar/navbar'
import Chats from '../Chats/chats'
export default function sidebar() {
    return (
        <>
            <div className='sidebar'>
               <Navbar/>
               <Chats/>
            </div>
        </>
    )
}
