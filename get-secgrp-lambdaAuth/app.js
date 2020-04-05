/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Token Authorzer Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - IAM policy to allow/deny the request
 *
 */
exports.lambdaHandler = function (event, context, callback) {
  console.log('Received event:', JSON.stringify(event, null, 2))
  var token = event.authorizationToken

  switch (token) {
    case 'allow':
      callback(null, generatePolicy('user', 'Allow', event.methodArn))
      break
    case 'deny':
      callback(null, generatePolicy('user', 'Deny', event.methodArn))
      break
    case 'unauthorized':
      // Return a 401 Unauthorized response
      callback('Unauthorized', null)
      break
    default:
      // Return a 401 Unauthorized response
      callback('Unauthorized', null)
  }
  console.log('DONE!!!')
}

// Help function to generate an IAM policy
var generatePolicy = function (principalId, effect, resource) {
  var authResponse = {}

  authResponse.principalId = principalId
  if (effect && resource) {
    var policyDocument = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    var statementOne = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }

  return authResponse
}
