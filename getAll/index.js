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
  }

  try {
    const data = await documentClient.scan(params).promise()
    if(data){
      let responseBody = JSON.parse(data.Items);
      console.log("BODY: ", responseBody);
      return {
        statusCode: 200,
        headers: {
          myHeader: "test"
        },
        body: responseBody
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      header: {
        myHeader: "failed"
      },
      body: {message: "Unable to get comments data: "+ error.message}
    }
  }

}
