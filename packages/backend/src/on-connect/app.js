/* eslint-disable linebreak-style */
const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const db = new DocumentClient();

const { DYNAMODB_TABLE } = process.env;

module.exports = {
  handler: async (event) => {
    const { requestContext } = event;
    const { routeKey, connectionId } = requestContext;
    switch (routeKey) {
      case '$connect':
        await db.put({
          TableName: DYNAMODB_TABLE,
          Item: {
            connectionId,
          },
        }).promise();
        break;
      case '$disconnect':
        await db.delete({
          TableName: DYNAMODB_TABLE,
          Key: { connectionId },
        }).promise();
        break;
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Unknown route' }),
        };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Welcome to the first serverless meetup.' }),
    };
  },
};
