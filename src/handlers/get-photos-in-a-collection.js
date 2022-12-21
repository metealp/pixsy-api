const { readATopicPhotos } = require('../utils/lib')

exports.getPhotosInACollectionHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getCollectionsHandler only accept GET method, you tried: ${event.httpMethod}`);
    }

    let photos
    let response = {}

    console.log('event.pathParameters', event.pathParameters)

    try {
        photos = readATopicPhotos(event.pathParameters.topic_name)
        response = {
            statusCode: 200,
            body: JSON.stringify({ photos })
        }
    } catch (err) {
        console.log("Error", err);
        let status = 500

        if (err.name === 'TopicNotFoundError') {
            status = 404
        }

        response = {
            statusCode: status,
            body: JSON.stringify({ name: err.name, message: err.message })
        }
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
