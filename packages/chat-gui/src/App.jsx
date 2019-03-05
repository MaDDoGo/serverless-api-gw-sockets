import React, { Component } from 'react';

import Login from './Login';
import Chat from './Chat';
import MyWebsocket from './websocket';

import 'bulma/css/bulma.css';


export default class ServerlessChatApp extends Component {
  constructor() {
    super();
    this.ws = new MyWebsocket();
    this.state = {
      isConnected: false,
      isLoggedIn: false,
    }
    this.ws.on('connect', this.onconnect);
    this.ws.on('disconnect', this.ondisconnect);
    this.ws.on('login', this.onlogin)
  }

  onconnect = (event) => {
   this.setState({ isConnected: true });
  }

  ondisconnect = (event) => {
    this.setState({ isConnected: false });
  }
  
  onlogin = (username) => {
    this.setState({ isLoggedIn: true, username });
  }

  render () {
    return (
      <div>
        {
          this.state.isLoggedIn ?
            <Chat ws={this.ws} isConnected={this.state.isConnected} username={this.state.username} /> :
            <Login ws={this.ws} isConnected={this.state.isConnected} onlogin={this.onlogin} />
        }
      </div>
    );
  }
};
