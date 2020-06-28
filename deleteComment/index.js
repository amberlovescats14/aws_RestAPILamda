'use strict'
const aws = require('aws-sdk')
aws.config.update({
  region: 'us-east-1'
})

exports.handler = async (event, context, callback) => {
  const ddb = new aws.DynamoDB({
    apiVersion: "2012-10-08"
  })
  const documentClient = new aws.DynamoDB.DocumentClient({
    region: "us-east-1"
  })


  let {
    id
  } = event.pathParameters

  const params = {
    TableName: "Comments",
    Key: {
      CommentId: id
    }
  }

  const headers = {
    "Content-Type": "application/json",
    "access-control-allow-origin": "*"
  }
  try {
    const data = await documentClient.delete(params).promise()
    if (data) {
      return {
        statusCode: 200,
        headers,
        body: params.Key.CommentId
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: {
        message: error.message
      }
    }
  }

}