import React from "react";
import Logout from "../Home/Logout";
import { useAuthState } from 'react-firebase-hooks/auth';

import { myFirebase } from '../../Config/MyFirebase';

import "./segment.css"
const auth = myFirebase.auth();

const Login = (props) => {
    function create() {
        props.history.push(`/room`);    //create video-room component
    }
    function chatr() {
        props.history.push('/chatroom') //chat app component
    }
    function Profile() {
        props.history.push('/profile')  //profile component
    }
    const [user] = useAuthState(auth);

    return (

        <div className="b">

            <div className="VClogin">
                {user ?
                    <button button id="profile" onClick={() => Profile()}>Profile</button>
                    : null}

                <ul> <button className="chat-button" onClick={create}>Video Chat</button></ul>
                <ul> <button className="chat-button" onClick={chatr}>Chat Room</button></ul>

            </div>
            <Logout />

        </div>
    );
};

export default Login;
