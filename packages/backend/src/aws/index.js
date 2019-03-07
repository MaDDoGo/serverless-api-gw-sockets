const AWS = require('aws-sdk');
const https = require('https');

module.exports = {
  configureAWS: () => {
    const ssl = new https.Agent({
      keepAlive: true,
      maxSocket: 50,
      rejectUnauthorized: true,
    });
    ssl.setMaxListeners(0);
    AWS.config.update({
      httpOptions: {
        agent: ssl,
      },
    });
  },
};
