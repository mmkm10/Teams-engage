import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import styled from "styled-components";

const VideoContainer = styled.div`
    padding: 60px;
    display: flex;
    height: 80vh;
    width: 80%;
    flex-wrap: wrap;
`;

const VideoDisplay = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <VideoDisplay playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 4,
    width: window.innerWidth / 4
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;
    const [cam, setCam] = useState(true);
    const [mute, setMute] = useState(true);

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8000");                            //io connection
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);                                    //socket emit
            socketRef.current.on("all users", users => {
                const peers = [];                                                           //peer mesh
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);          //each peer
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

    function createPeer(userToSignal, callerID, stream) {                                   //creating a new peer for the mesh
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

    function addPeer(incomingSignal, callerID, stream) {                                    //Add the new peer
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

    function muteCam() {                                                                      // Camera off
        userVideo.current.srcObject.getVideoTracks().forEach(track => track.enabled = !track.enabled);
        setCam(!cam);

    }

    function muteAudio() {                                                                     //Mic off
        userVideo.current.srcObject.getAudioTracks().forEach(track => track.enabled = !track.enabled)
        setMute(!mute);
    }

    return (
        <>
            <VideoContainer>
                <div className="vid-button">
                    <button className={cam ? "mute" : "unmute"} onClick={() => (muteCam())}>Video off</button>
                    <button className={mute ? "mute" : "unmute"} onClick={() => (muteAudio())}>Mute</button>
                    <button className="mute" onClick={() => props.history.push(`/Login`)}>End</button>      
                </div>
                <VideoDisplay muted ref={userVideo} autoPlay playsInline />
                {peers.map((peer, index) => {
                    return (
                        <Video key={index} peer={peer} />
                    );
                })}

            </VideoContainer>
            <alert>Send this link to your friends to join: {window.location.href}</alert>

        </>
    );
};

export default Room;




