import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';

import { myFirebase, myFirestore } from '../../Config/MyFirebase';

import './Home.css'

const auth = myFirebase.auth();

function Login() {
    const [user] = useAuthState(auth);

    const signInWithGoogle = () => {
        const provider = new myFirebase.auth.GoogleAuthProvider();
        if (!user) {
            // User not logged in, start login.
            auth.signInWithPopup(provider);
        } else {
            // user logged in, go to home page.
            window.location='Login';
        }
    }

    return (
        <>
         <ul>   <button id="button-log" onClick={signInWithGoogle}>Sign in with Google</button> </ul>
        </>

    )
}
export default Login;