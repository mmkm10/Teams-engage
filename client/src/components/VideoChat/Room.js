import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import sharescreen from './share';
import './video.css';



const StyledVideo = styled.video`
    height:400px;
    width 700px;
    justify-content:centre;

`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;

        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const Constraints = {
    video: true,
    audio: true
}


const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;
    const [cam, setCam] = useState(true);
    const [mute, setMute] = useState(true);
    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia(Constraints).then(stream => {
            userVideo.current.srcObject = stream;

            socketRef.current.emit("join room", roomID);

            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })

                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);
        return peer;
    }

    function muteCam() {
        userVideo.current.srcObject.getVideoTracks().forEach(track => track.enabled = !track.enabled);
        setCam(!cam);

    }

    function muteAudio() {
        userVideo.current.srcObject.getAudioTracks().forEach(track => track.enabled = !track.enabled)
        setMute(!mute);
    }


    return (
        <>
            <div className="Container">
                <StyledVideo muted ref={userVideo} autoPlay playsInline />
                    {peers.map((peer, index) => {
                        return (
                            <div> <Video key={index} peer={peer} /> </div>
                        );
                    })}
                </div>



            <button className={cam ? "mute" : "unmute"} onClick={() => (muteCam())}>Video off</button>
            <button className={mute ? "mute" : "unmute"} onClick={() => (muteAudio())}>Mute</button>
            <button className="mute" onClick={() => props.history.push(`/Login`)}>End</button>

        </>
    );
};

export default Room;
