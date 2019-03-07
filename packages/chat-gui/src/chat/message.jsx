import React from 'react';

export default (props) => {
  const { message, i } = props;
  const { text, username } = message;

  return (
    <div className="columns" style={{ padding: '.25em', overflowWrap: 'normal' }}>
      <div className="column">
        <div className={`tags has-addons is-pulled-${username ? 'left' : 'right'}`}>
          {username && <span className="tag"><i className="fas fa-user"></i> {username}</span>}
          <span key={i} className={`tag ${username ? 'is-success' : 'is-info'}`}>{text}</span>
        </div>
      </div>
    </div>
  );
};
