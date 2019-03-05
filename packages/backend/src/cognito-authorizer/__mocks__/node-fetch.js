const { generateKeys } = require('../__mocks__/generate-keys');

const KEY_ID = 'abcdefghijklmnopqrsexample=';

module.exports = async () => ({
  json: async () => generateKeys(KEY_ID),
});
