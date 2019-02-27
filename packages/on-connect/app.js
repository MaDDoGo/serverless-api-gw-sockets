const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const db = new DocumentClient();

module.exports = {
  handler: async (event, context) => {
    console.log(event, context);
    const { requestContext } = event;
    switch (requestContext.routeKey) {
      case '$connect':
        await db.put({
          TableName: 'users',
          Item: {
            connectionID: requestContext.connectionId,
          },
        }).promise();
        break;
      case '$disconnect':
        await db.delete({
          TableName: 'users',
          Key: {
            connectionID: requestContext.connectionId,
          },
        }).promise();
        break;
      default:
        return {
          statusCode: 400,
          body: { message: 'Unknown route' },
        };
    }
    return {
      statusCode: 200,
      body: 'Welcome to the first serverless meetup.',
    };
  },
};
