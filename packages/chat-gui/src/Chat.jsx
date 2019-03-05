import React, { PureComponent } from 'react';

import Message from './Message';
import SendMessage from './SendMessage';

export default class Chat extends PureComponent {
  constructor(props) {
    super();
    this.state = { messages: [] };
    this.ws = props.ws;

    this.ws.on('message', this.onmessage);
  }
  onopen = (event) => {
    console.log('onopen')
  }

  onmessage = ({ data }) => {
    try {
      const { message, username } = JSON.parse(data);
      this.setState({
        messages: [
          ...this.state.messages,
          { text: message, username }
        ]
      });
    } catch (err) {

    }
  }

  onclose = (event) => {
    console.log('onopen')
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
      <div>
        <section className="hero is-fullheight">
          <div className="hero-head">
            <header className="hero is-link is-bold">
              <div className="hero-body">
                <div className="container">
                  <p className="title">
                    Serverless meetup #1
                  </p>
                  <p className="subtitle">
                    Websockets with API Gateway
                  </p>
                </div>
              </div>
            </header>
          </div>
          <div className="hero-body">
            <div style={{ heigth: '100%', width: '100%' }}>
              {this.state.messages.map((message, i) => (
                <Message message={message} key={i} />
              ))}
            </div>
          </div>
        </section>
        <footer className="section is-small">
          <SendMessage saveMsg={this.saveMsg} />
        </footer>
      </div>
    )
  }
}


