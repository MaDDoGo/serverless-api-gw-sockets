const Sockette = require('sockette');
const Actions = require('./actions');

export default class Sockets {
  constructor(params) {
    const {
      url = 'wss://9ehfvjymbl.execute-api.us-east-1.amazonaws.com/dev',
      onopen,
      onmessage,
      onclose
    } = params;
  
    this.ws = new Sockette(url, {
      timeout: 5e3,
      maxAttempts: 10,
      onopen,
      onmessage,
      onclose,
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onerror: e => console.log('Error:', e),
    });
  }

  sendMessage(toUser, message) {
    this.ws.json({
      action: Actions.SEND_MESSAGE,
      username: toUser,
      message,
    });
  }

  login(asUser) {
    this.ws.json({
      action: Actions.LOGIN,
      username: asUser,
    });
  }

  logout(asUser) {
    this.ws.json({
      action: Actions.LOGOUT,
      username: asUser,
    });
  }
};
