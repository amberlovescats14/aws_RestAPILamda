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

  try {
    const data = await documentClient.delete(params).promise()
    if (data) {
      return {
        statusCode: 200,
        headers: {
          myHeader: "Delete success"
        },
        body: params.Key.CommentId
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      header: {
        myHeader: "failed"
      },
      body: {
        message: error.message
      }
    }
  }

}