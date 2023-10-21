import React from "react";
import Sidebar from '../../component/Sidebar/sidebar'
import Chat from '../../component/Chat/chat'
import './Home.scss'
export default function Home() {
  return (
    <>
       <div className="container">
        <Sidebar/>
        <Chat/>
       </div>
    </>
  );
}
