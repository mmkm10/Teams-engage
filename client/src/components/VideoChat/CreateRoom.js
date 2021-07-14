import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v1 as uuid } from "uuid";
import "./video.css";


const CreateRoom = (props) => {
    function create() {
        const id = uuid();                              //unique id for room
        props.history.push(`/room/${id}`);              
    }

    const [formData, setFormData] = useState('');



    return (
            <div className="BTN">
                <ul> <button className="enter-button" onClick={create}>Create room</button> </ul>
                <ul>   <form >
                    <button type="submit" className="enter-button"  >Enter Room</button>

                    <input className="link-input" placeholder="Room Code..." type="text" onChange={(event) => setFormData(event.target.value)} />
                    <Link onClick={e => (!formData) ? e.preventDefault() : null} to={`/room/${formData}`}>

                    </Link>
                </form>
                </ul>
            </div>
    );
};

export default CreateRoom;
