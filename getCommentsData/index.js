'use strict'
const aws = require('aws-sdk')
aws.config.update({
  region: 'us-east-1'
})

exports.handler = async (event, context, callback)  => {
  const ddb = new aws.DynamoDB({
    apiVersion: "2012-10-08"
  })
  const documentClient = new aws.DynamoDB.DocumentClient({
    region: "us-east-1"
  })

  let { id } = event.pathParameters

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
    const data = await documentClient.get(params).promise()
    if(data){
      let responseBody = JSON.stringify(data.Item);
      return {
        statusCode: 200,
        headers,
        body: responseBody
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: {message: "Unable to get user data"}
    }
  }

}

