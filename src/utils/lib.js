const topics = require('../../data/topics.json')
const photosObj = require('../../data/photos.json')
const { TopicNotFoundError } = require('./error')



const readAllPhotos = () => {
    const photos = photosObj.photos

    let collections = []
    let topicsDict = {}

    // enumarate topics
    for (let topicIndex in topics) {
        topicsDict[topics[topicIndex]] = topicIndex

        collections.push({
            display: topics[topicIndex],
            thumbnails: [],
            len: 0
        })
    }

    for (let photo of photos) {
        for (let topic of photo.topics) {
            const indexOfTopic = topicsDict[topic]
            collections[indexOfTopic].len += 1
            if (collections[indexOfTopic].len < 5) {
                collections[indexOfTopic].thumbnails.push(photo.url)
            }
        }
    }

    return collections
}

const readATopicPhotos = (topicName) => {

    if (!topics.includes(topicName)) {
        throw new TopicNotFoundError('Please provide a valid topic name')
    }

    const photos = photosObj.photos
    let topicCollection = []

    for (let photo of photos) {
        if (photo.topics.includes(topicName)) {
            topicCollection.push(photo)
        }
    }

    return topicCollection
}

module.exports = { readAllPhotos, readATopicPhotos }