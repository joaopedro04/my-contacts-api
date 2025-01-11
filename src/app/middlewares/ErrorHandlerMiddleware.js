function errorHandlerMiddleware(error, request, response, next) {
    console.error(error);
    return response.status(500).json({
        message: 'Internal server error'
    });
}

module.exports = {
    errorHandlerMiddleware
};
