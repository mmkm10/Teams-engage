import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { v1 as uuid } from 'uuid';
import './Chat.css';
import Popup from './popup';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { myFirebase, myFirestore } from '../../Config/MyFirebase';

import SignIn from "../Home/Login"

const auth = myFirebase.auth();
const firestore = myFirestore;

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

function Chat() {

  const [user] = useAuthState(auth);
  const id = uuid();
  const history = useHistory();
  //const [currentRoom]=useState(window.location.href);



  return (
    <div className="app">
      <header>
        <SignOut />
        <button className="mute" onClick={() => history.push(`/Login`)}>Go back</button>
        <Popup/>

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div >
  );
}



function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

const ChatRoom = () => {
  const currentRoom = window.location.href;
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef
    //.where("room", "==", currentRoom)
    .orderBy("createdAt")
    .limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      //  room: currentRoom,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage message={msg} key={msg.id} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type..." />

      <button type="submit" disabled={!formValue} onClick={() => console.log(formValue)}>Send!</button>

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