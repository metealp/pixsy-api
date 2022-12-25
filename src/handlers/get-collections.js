const { readAllTopics } = require('../utils/lib')

exports.getCollectionsHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getCollectionsHandler only accept GET method, you tried: ${event.httpMethod}`);
    }

    let collections
    let response = {}

    try {
        topics = readAllTopics()
        response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, GET, HEAD',
            },
            body: JSON.stringify({ topics })
        }
    } catch (err) {
        console.log("Error", err);
        response = {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, GET, HEAD',
            },
            body: JSON.stringify({ name: err.name, message: err.message })
        }
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
