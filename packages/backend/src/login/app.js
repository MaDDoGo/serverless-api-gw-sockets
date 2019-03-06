const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const db = new DocumentClient();

const { DYNAMODB_TABLE } = process.env;

module.exports = {
  handler: async (event) => {
    const { requestContext, body } = event;
    const { connectionId } = requestContext;
    const { username } = JSON.parse(body);

    if (!username) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid username',
        }),
      };
    }
    try {
      await db.update({
        TableName: DYNAMODB_TABLE,
        Key: { connectionId },
        UpdateExpression: 'set username=:r',
        ExpressionAttributeValues: {
          ':r': username,
        },
        ConditionExpression: 'attribute_not_exists(username)',
      }).promise();
      return {
        statusCode: 200,
      };
    } catch (err) {
      console.log(err);
      if (err.name === 'ConditionalCheckFailedException') {
        return {
          statusCode: 400,
          body: {
            message: 'User already exists',
          },
        };
      }
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Unknown error' }),
      };
    }
  },
};
