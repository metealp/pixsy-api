const topics = require('../../data/topics.json')
const photosObj = require('../../data/photos.json')

exports.getCollectionsHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getCollectionsHandler only accept GET method, you tried: ${event.httpMethod}`);
    }
    // console.info('received:', event);
    // const topics = await JSON.parse(await readFile(path.resolve('.', 'directory', '../../data/topics.json'), 'utf-8'));
    // const topics = JSON.parse(fs.readFileSync('../../data/topics.json'));
    // const photos = JSON.parse(fs.readFileSync('../../data/photos.json'));


    // const photos = await JSON.parse(
    //     await readFile(path.resolve('.', 'directory', '../../data/photos.json'), 'utf-8')
    // ).photos;

    console.log(topics)
    console.log(photosObj)
    const photos = photosObj.photos

    let collections = {
        topics
    }

    try {

        for (let topic of topics) {
            collections[topic] = {
                thumbnails: [],
                photos: [],
                len: 0
            }
        }

        console.log(collections)


        for (let photo of photos) {

            for (let topic of photo.topics) {
                collections[topic].photos.push(photo)
                collections[topic].len += 1
                if (collections[topic].len < 5) {
                    collections[topic].thumbnails.push(photo.url)
                }
            }
        }

        console.log(collections)

    } catch (err) {
        console.log("Error", err);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(collections)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
