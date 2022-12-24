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
            body: JSON.stringify({ topics })
        }
    } catch (err) {
        console.log("Error", err);
        response = {
            statusCode: 500,
            body: JSON.stringify({ name: err.name, message: err.message })
        }
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
