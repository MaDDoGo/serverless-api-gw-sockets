import React from 'react';

import Login from './Login';
import Chat from './Chat';

import 'bulma/css/bulma.css';

const isLoggedIn = true;

export default () => {
  return (
    <div>
      {isLoggedIn ? <Chat /> : <Login />}
    </div>
  );
};
