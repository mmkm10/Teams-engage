import React from "react";
import "./Home.css"
import Login from './Login';

import {myFirebase, myFirestore} from '../../Config/MyFirebase'
import { useAuthState } from "react-firebase-hooks/auth";

const auth=myFirebase.auth();



const Home = (props) => {
    function logg() {
        props.history.push(`/Login`);         //For login as guest button call
    }
    const [user] =useAuthState(auth);


    return (

        <div className="bg">
            <div className="Home">
                <h1> Welcome!</h1>
            </div>
            <div className="Login">


                <section>


                 <Login /> 
                </section>
           <ul>     <button id="button-log" onClick={logg}>Login as a Guest</button></ul>
            </div>
        </div >

    );
};

export default Home;
