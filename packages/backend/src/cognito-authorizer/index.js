const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const { jwk2pem } = require('pem-jwk');

// TODO: Fill the gaps
const COGNITO_KEYS = (region, userPoolId) => `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;

const invalidParameter = (param) => { throw new Error(`Invalid param ${param}`); };

module.exports = {
  // Lambda handler
  handler: async (event) => {
    // Lambda config
    const {
      AWS_REGION = 'us-east-1',
      COGNITO_USERPOOL_ID = invalidParameter('COGNITO_USERPOOL_ID'),
    } = process.env;

    // Event parsing
    const {
      headers,
    } = event;

    const [, token] = headers['X-Authorization-Token'].split(' ');
    const decoded = jwt.decode(token, { complete: true });

    const request = await fetch(COGNITO_KEYS(AWS_REGION, COGNITO_USERPOOL_ID));
    const { keys } = await request.json();

    const key = keys.find(k => k.kid === decoded.header.kid);

    try {
      jwt.verify(token, jwk2pem(key));
      return { statusCode: 200 };
    } catch (error) {
      console.error(error.message);
      switch (error.name) {
        case 'JsonWebTokenError':
          return { statusCode: 401 };
        case 'TokenExpiredError':
          return { statusCode: 403 };
        case 'NotBeforeError': {
          return { statusCode: 401 };
        }
        default: {
          return { statusCode: 400 };
        }
      }
    }
  },
};
