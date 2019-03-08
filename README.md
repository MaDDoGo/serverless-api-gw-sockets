# Serverless Websocket API

Serverless AWS API Gateway with Websockets and Lambda

## Description

This PoC shows a basic chat done with react and a websocket API done with API Gateway

## Structure

The project is split into 2 folders:

`packages/backend` 

That contains the backend files and 

`packages/chat-gui`

that contains the GUI.

## Backend

The backend is done in nodejs (V8.10) that is the one that currently is supported by AWS Lambda. 

To install you need to do an `npm i`.
To deploy you need to do an `npm deploy` that will deploy the GUI using Serverless. In order yto deploy, you need to have the aws-cli installed with some credentials configured like explained here: https://serverless.com/framework/docs/providers/aws/guide/credentials/

## Frontend

The frontend is done in React JS using CRA2. 

To install you need to do an `npm i` and to develop use `npm run start` to launch webpack dev server.
To deploy you need to create a production build using `npm run build` and then I suggest upload the code to a website bucket in S3 using `aws s3 cp build s3://name-of-bucket`. 


## Resources:

https://aws.amazon.com/blogs/compute/announcing-websocket-apis-in-amazon-api-gateway/

https://github.com/aws-samples/simple-websockets-chat-app/blob/master/template.yaml

https://github.com/aws-samples/aws-cognito-apigw-angular-auth/blob/master/sam/sam.yaml

