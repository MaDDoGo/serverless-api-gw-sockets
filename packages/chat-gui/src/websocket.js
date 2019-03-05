import Sockette from 'sockette';
import Actions from './actions';
import EventEmitter from 'events';

export default class Sockets extends EventEmitter {
  constructor(params = {}) {
    super();
    const {
      url = 'wss://fen75cgmua.execute-api.us-east-1.amazonaws.com/dev',
      onopen,
      onclose
    } = params;
  
    this.ws = new Sockette(url, {
      timeout: 5e3,
      maxAttempts: 10,
      onopen,
      onmessage: this.handleMessages,
      onclose,
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onerror: e => console.log('Error:', e),
    });
  }

  handleMessages = ({ data }) => {
    const parsed = JSON.parse(data);
    this.emit(parsed.action, parsed);
  }

  sendMessage = (toUser, message) => {
    this.ws.json({
      action: Actions.SEND_MESSAGE,
      username: toUser,
      message,
    });
  }

  login = (asUser) => {
    this.ws.json({
      action: Actions.LOGIN,
      username: asUser,
    });
  }

  logout = (asUser) => {
    this.ws.json({
      action: Actions.LOGOUT,
      username: asUser,
    });
  }
};
