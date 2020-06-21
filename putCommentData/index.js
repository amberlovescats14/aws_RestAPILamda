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
    Item: {
      CommentId: "2",
      Author: "Jane",
      Message: "Posting"
    }
  }

  try {
    const data = await documentClient.put(params).promise()
    console.log("DATA: ", data);
  } catch (error) {
    console.log(error);
  }

}

