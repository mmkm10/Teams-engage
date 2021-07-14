import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import './Chat.css';
import Popup from './popup';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { myFirebase, myFirestore } from '../../Config/MyFirebase';

import SignIn from "../Home/Login"

const auth = myFirebase.auth();


function Chat() {

  const [user] = useAuthState(auth);
  const history = useHistory();
  const [showPopup, setShowPopup] = useState("true");




  return (
    <div className="app">
      <header>
        {!showPopup && <Popup />}           

        {user ? <button onClick={() => setShowPopup(!showPopup)}>VIDEO</button>
          : null}
        <button onClick={() => history.push(`/Login`)}>Go back</button>

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div >
  );
}





function ChatRoom() {
  const userRef = useRef();
  const messagesRef = myFirestore.collection('messages');
  const query = messagesRef
  .orderBy('createdAt')
  .limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [inputMsg, setInputMsg] = useState('');                   //For input


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({                                       //messages details added
      text: inputMsg,
      room: window.location.href,
      createdAt: myFirebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setInputMsg('');
    userRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={userRef}></span>

    </main>

    <form className="form-send" onSubmit={sendMessage}>

      <input value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} placeholder="Type.." />       

      <button type="submit" disabled={!inputMsg}>SEND!</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}


export default Chat;