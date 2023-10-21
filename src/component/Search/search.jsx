import React, { useContext, useState } from "react";
import "./search.scss";
import searchImg from "./..//../assets/imges/search.png";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { authContext } from "../../context/authContext";

export default function Search() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(authContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combindId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combindId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combindId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combindId + ".userInfo"]: {
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combindId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db,"userChats", user.uid), {
          [combindId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combindId + ".date"]: serverTimestamp()
        });
      }
    } catch (err) {};
    setUser(null);
    setUserName("");
  };

  return (
    <>
      <div className="search">
        <div className="searchForm">
          <input
            type="text"
            placeholder="Search"
            onKeyDown={handleKey}
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <img src={searchImg} alt="img" />
        </div>
        {err && <span>User NOT Found ...</span>}
        {user && (
          <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt="img" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
