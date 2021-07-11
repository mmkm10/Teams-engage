import React from "react";
import Logout from "../Home/Logout";
import "./segment.css"
const Login = (props) => {
    function create() {
        props.history.push(`/room`);
    }
    function chatr() {
        props.history.push('/chatroom')
    }
    function Profile() {
        props.history.push('/profile')
    }

    return (

        <div className="b">
                            <Logout />

            <div className="VClogin">

                <button button id="profile" onClick={() => Profile()}>Profile</button>

                <ul> <button className="chat-button" onClick={create}>Video Chat</button></ul>
                <ul> <button className="chat-button" onClick={chatr}>Chat Room</button></ul>

            </div>
        </div>
    );
};

export default Login;
