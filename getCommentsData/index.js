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

  const params = {
    TableName: "Comments",
    Key: {
      CommentId: "1"
    }
  }

  try {
    const data = await documentClient.get(params).promise()
    console.log("DATA: ", data);
  } catch (error) {
    console.log(error);
  }

}

