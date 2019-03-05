const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { pem2jwk } = require('pem-jwk');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const cognitoExample = (region, userPool) => ({
  // auth_time: 1500009400,
  // iat: 1500009400,
  iss: `https://cognito-idp.${region}.amazonaws.com/${userPool}`,
  scope: 'aws.cognito.signin.user.admin',
  sub: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  token_use: 'access',
  username: 'janedoe@example.com',
});

const signOptions = kid => ({
  header: {
    kid,
    alg: 'RS256',
  },
  expiresIn: '2m',
});


module.exports = {
  generateKeys: async kid => ({
    keys: [{
      alg: 'RS256',
      kid,
      use: 'sig',
      ...pem2jwk(await readFile(path.join(__dirname, 'keys/jwtRS256.key.pub'))),
    }],
  }),
  getJWTToken: async (kid, { AWS_REGION, COGNITO_USERPOOL_ID }) => jwt.sign(
    cognitoExample(AWS_REGION, COGNITO_USERPOOL_ID),
    await readFile(path.join(__dirname, 'keys/jwtRS256.key')),
    signOptions(kid),
  ),
};
