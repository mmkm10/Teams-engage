import React from 'react'
import { useHistory } from 'react-router-dom';

import { myFirebase, myFirestore } from '../../Config/MyFirebase'

const auth=myFirebase.auth();

const Logout = () => {
    const history=useHistory();

    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut() & history.push('/')}>Sign Out</button>
    )

}

export default Logout
