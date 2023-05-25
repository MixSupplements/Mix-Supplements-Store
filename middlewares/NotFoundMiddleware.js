
module.exports = (request, response, next) => {
    response.status(404).json({ message: "Page Not Found" });
}