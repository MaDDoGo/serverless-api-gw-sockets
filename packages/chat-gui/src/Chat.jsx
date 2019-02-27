import React from 'react';

import Message from './Message';
import SendMessage from './SendMessage';
import websocket from './sockette';

export default class Chat extends React.PureComponent {
  constructor() {
    super();
    this.state = { messages: [{message:''}] };

    
  }

  saveMsg = (msg) => this.setState({
    messages: [
      ...this.state.messages,
      msg
    ]
  });

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
                <Message message={message} i={i} />
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


