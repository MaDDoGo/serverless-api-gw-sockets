import React from 'react';

import 'bulma/css/bulma.css';

export default () => {
  return (
    <section class="hero is-dark is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-half is-offset-one-quarter">
              <div class="control has-icons-left has-icons-right">
                <input class="input is-large" type="email" placeholder="Input username" />
                <span class="icon is-medium is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-medium is-right">
                  <i class="fas fa-check"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
