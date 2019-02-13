const jwt = require('jsonwebtoken');

const { getJWTToken, generateKeys } = require('../../../__mocks__/generate-keys');

const { handler } = require('../');

const getKey = (keys, kid) => keys.find(f => f.kid === kid);

const KEY_ID = 'abcdefghijklmnopqrsexample=';

describe('Test cognito authorizer', () => {
  beforeAll(() => {
    process.env = {
      AWS_REGION: 'eu-west-1',
      AWS_ACCOUNT_ID: 124,
      COGNITO_USERPOOL_ID: 'my-cognito-userpool',
    };
  });
  it('JWT Token decryption', async () => {
    const token = await getJWTToken(KEY_ID, process.env);
    const { keys } = await generateKeys(KEY_ID);

    const decodedToken = jwt.decode(token, getKey(keys, KEY_ID));

    expect(decodedToken.token_use).toBe('access');
  });

  it('will work', async () => {
    await handler({
      headers: {
        'X-Authorization-Token': `Bearer ${await getJWTToken(KEY_ID, process.env)}`,
      },
    });
  });
});
