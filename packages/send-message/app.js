const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const APIGatewayManagementAPI = require('aws-sdk/clients/apigatewaymanagementapi');
const db = new DocumentClient();
const apiGateway = new APIGatewayManagementAPI({
  endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
});

module.exports = {
  handler: async (event) => {
    const { requestContext, body } = event;

    const { message } = body;

    const { Items } = await db.scan({
      TableName: 'users',
      ProjectionExpression: 'connectionId',
    }).promise();

    Items.map(({ connectionId }) => {

    });
    return {
      statusCode: 200,
      bbody: {
        message: 'User disconnected from the meetup ☹️',
      },
    };
  },
};
