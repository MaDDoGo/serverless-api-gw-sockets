import React, { useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css'

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
            <div className="column is-8 is-offset-2">
              <div className="control has-icons-left">
                <form onSubmit={onSubmit}>
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input className="input" placeholder="Username" onChange={onChange} />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <div className="control">
                      <button className="button"><i className="fas fa-arrow-right"></i></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
