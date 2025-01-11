function fieldsMiddleware(request, response, next) {
    const { email, name } = request.body;
    if (!email) {
        response.status(400).json({
            error: 'Email cannot be undefined'
        });
    }

	 if (!name) {
        response.status(400).json({
            error: 'Name cannot be undefined'
        });
    }

    next();
}

module.exports = {
    fieldsMiddleware
};
