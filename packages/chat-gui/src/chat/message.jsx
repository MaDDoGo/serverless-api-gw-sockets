import React from 'react';

export default (props) => {
  const { message, i } = props;
  const { text, username, action } = message;

  return (
    <p style={{ padding: '.25em', textAlign: username ? 'left' : 'right', overflowWrap: 'normal' }}>
      <span key={i} className={`tag is-medium ${username ? 'is-success' : 'is-info'}`}>{text}</span>
    </p>
  );
};
