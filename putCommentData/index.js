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
  let { CommentId, Author, Message } = JSON.parse(event.body)

  const params = {
    TableName: "Comments",
    Item: {
      CommentId,
      Author,
      Message
    }
  }

  try {
    const data = await documentClient.put(params).promise()
    if(data){
      return {
        statusCode: 201,
        headers: {
          myHeader: "amberjones"
        },
        body: JSON.stringify(params.Item)
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      header: {
        myHeader: "failed"
      },
      body: {message: "Unable to put user data"}
    }
  }

}

