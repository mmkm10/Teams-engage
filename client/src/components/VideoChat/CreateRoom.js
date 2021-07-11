import React, {useReducer} from "react";
import { v1 as uuid } from "uuid";
import "./video.css";

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
   }
const CreateRoom = (props) => {
    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const [formData, setFormData] = useReducer(formReducer, {});

    const handleChange = event => {
        setFormData({
          name: event.target.name,
          value: event.target.value,
        });
      }
    return (
        <div id="BTN">
            <ul> <button className="chat-button" onClick={create}>Create room</button> </ul>
            <form>
                <ul>
                    <input  name="link" ></input>
                    <button type="submit" className="chat-button" onClick={() => openInNewTab({handleChange})} >Enter Link</button>
                </ul>
            </form>
        </div>
    );
};

export default CreateRoom;
