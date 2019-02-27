const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const db = new DocumentClient();

module.exports = {
  handler: async (event, ctx) => {
    const { requestContext, body } = event;

    if (!body.username) {
      return {
        statusCode: 400,
        body: {
          message: 'Invalid username',
        },
      };
    }
    try {
      await db.update({
        TableName: 'users',
        Key: { connectionID: requestContext.connectionId },
        Item: {
          username: body.username,
        },
        ConditionExpression: 'attribute_not_exists(username)',
      }).promise();
    } catch (err) {
      console.error(err);
      if (err.name === 'ConditionalCheckFailedException') {
        return {
          statusCode: 200,
          body: {
            message: 'User already exists',
          },
        };
      }
    }
  },
};
