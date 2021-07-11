import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Chat.css'
import Chat from './Chat';

export default function ChatRoom() {
    const [room, setRoom] = useState('');

  return (
    <>
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="chat-heading">Join</h1>
    
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>

        <Link onClick={e => ( !room) ? e.preventDefault() : null} to={`/chat?room=${room}`}>
        
          <button className={'chat-button mt-20'} type="submit">Enter the room</button>
        </Link>

      </div>
    </div>
    </>
  );
}
