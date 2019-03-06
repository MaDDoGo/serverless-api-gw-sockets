import React, { PureComponent, Fragment } from 'react';

import Header from './header';
import Message from './message';
import SendMessage from './send-message';

export default class Chat extends PureComponent {
  constructor(props) {
    super();
    this.state = { messages: [] };
    this.ws = props.ws;

    this.ws.on('message', this.onmessage);
  }

  onmessage = (evt) => {
    try {
      const { message, username } = evt;
      this.setState({
        messages: [
          ...this.state.messages,
          { text: message, username }
        ]
      });
    } catch (err) {
      console.error();
    }
  }

  saveMsg = (msg) => {
    this.ws.sendMessage('user', msg)
    this.setState({
      messages: [
        ...this.state.messages,
        { text: msg }
      ]
    });
  } 

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container" style={{overflowY: 'auto', height: `${document.documentElement.clientHeight - 293}px` }}>
          {this.state.messages.map((message, i) => (
            <Message message={message} key={i} />
          ))}
        </div>
        <footer className="section is-small" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <SendMessage saveMsg={this.saveMsg} />
        </footer>
      </Fragment>
    )
  }
}


