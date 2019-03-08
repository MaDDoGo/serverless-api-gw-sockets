import React, { Component, Fragment } from 'react';
import * as ReactDOM from 'react-dom';

import Header from './header';
import Message from './message';
import SendMessage from './send-message';

export default class Chat extends Component {
  constructor(props) {
    super();
    this.state = { messages: [] };
    this.ws = props.ws;
    this.username = props.username;

    this.ws.on('message', this.onmessage);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.scrollToBottom();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  updateDimensions = () => {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
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
    this.ws.sendMessage(this.username, msg)
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
        <div className="container" ref="messageList" style={{ overflowY: 'auto', height: `${document.documentElement.clientHeight - 293}px`, padding: '15px' }}>
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


