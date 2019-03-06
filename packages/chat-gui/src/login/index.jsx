import React, { useState } from 'react';

import 'bulma/css/bulma.css';

export default (props) => {
  const [user, setUser] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    props.ws.login(user);
    props.onlogin(user);
  };

  const onChange = (e) => {
    setUser(e.target.value);
  }

  return (
    <section className="hero is-dark is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column is-half is-offset-one-quarter">
              <div className="control has-icons-left has-icons-right">
                <form onSubmit={onSubmit}>
                  <input className="input is-large" placeholder="Input username" onChange={onChange} />
                </form>
                <span className="icon is-medium is-left">
                  <i className="fas fa-envelope" />
                </span>
                <span className="icon is-medium is-right">
                  <i className="fas fa-check"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
