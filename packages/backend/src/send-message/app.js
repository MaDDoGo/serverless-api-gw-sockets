const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const APIGatewayManagementAPI = require('aws-sdk/clients/apigatewaymanagementapi');

const db = new DocumentClient();

const { DYNAMODB_TABLE } = process.env;

module.exports = {
  handler: async (event) => {
    console.log(event);
    const { body, requestContext } = event;
    const { domainName, stage } = requestContext;
    const { message, username } = JSON.parse(body);

    const apiGateway = new APIGatewayManagementAPI({
      endpoint: `${domainName}/${stage}`,
    });

    const { Items } = await db.scan({
      TableName: DYNAMODB_TABLE,
      ProjectionExpression: 'connectionId',
    }).promise();

    const promises = Items.map(async ({ connectionId }) => {
      if (connectionId === requestContext.connectionId) return Promise.resolve();
      try {
        return apiGateway.postToConnection({
          ConnectionId: connectionId,
          Data: JSON.stringify({ action: 'message', message, username }),
        }).promise();
      } catch (err) {
        if (err.statusCode === 410) {
          console.log(`Found stale connection, deleting ${connectionId}`);
          db.delete({
            TableName: DYNAMODB_TABLE,
            Key: { connectionId }
          }).promise();
          return Promise.resolve();
        }
        console.log(`Failed to post. Error: ${JSON.stringify(err)}`);
        return Promise.resolve();
      }
    });
    await Promise.all(promises);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Message sent',
      }),
    };
  },
};
