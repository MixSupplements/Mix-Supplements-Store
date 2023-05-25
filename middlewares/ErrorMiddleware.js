module.exports = (error, request, response, next) => {
    response.status(500).json({ message: error + "" });
}