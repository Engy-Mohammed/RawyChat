import React , {useContext} from "react";
import "./chat.scss";
import camera from "./../../assets/imges/video-camera (1).png";
import profile from "./../../assets/imges/profile.png";
import more from "./../../assets/imges/more.png";
import Messages from './../messages/messages'
import Input from './../Input/input'
import { ChatContext } from '../../context/ChatContext'

export default function Chat () {
  const {data} = useContext(ChatContext);
  return (
    <>
      <div className="chat">
        <div className="chatInfo">
          <span>{data.user?.displayName}</span>
          <div className="chatImgs">
            <img src={camera} alt="img" />
            <img src={profile} alt="img" />
            <img src={more} alt="img" />
          </div>
        </div>
        <Messages/>
        <Input/>
      </div>
    </>
  );
};

