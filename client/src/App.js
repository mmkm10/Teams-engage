import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import firebase from 'firebase/app';

import Home from "./components/Home/Home";
import Login from "./components/Segment/segment";
import CreateRoom from "./components/VideoChat/CreateRoom";
import Chatroom from './components/Chatroom/Mainchat';
import Room from "./components/VideoChat/Room";
import Profile from "./components/Home/Profile";
import chat from "./components/Chatroom/Chat";
import "./App.css";



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Profile" exact component={Profile} />
        <Route path="/room" exact component={CreateRoom} />
        <Route path="/room/:roomID" component={Room} />
        <Route path="/chatroom" exact component={Chatroom} />
        <Route path="/chat" component={chat}/>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
