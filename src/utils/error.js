class TopicNotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = "TopicNotFoundError"
    }
}

module.exports = { TopicNotFoundError }