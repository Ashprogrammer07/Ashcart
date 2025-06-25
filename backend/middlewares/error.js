module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Development Mode
    if (process.env.NODE_ENV === "development") {
        if (err.name === "ValidationError") {
            err.message = Object.values(err.errors).map(value => value.message).join(', ');
            err.statusCode = 400;
        }

        if (err.name === "CastError") {
            err.message = `Resource not found. Invalid: ${err.path}`;
            err.statusCode = 400;
        }

        console.error(err.stack);

        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            errorName: err.name
        });
    }

    // Production Mode
    let error = new Error(err.message);
    error.statusCode = err.statusCode;
    error.name = err.name;
    error.code = err.code;
    error.stack = err.stack;
    error.keyValue = err.keyValue;
    error.path = err.path;

    if (err.name === "ValidationError") {
        error.message = Object.values(err.errors).map(value => value.message).join(', ');
        error.statusCode = 400;
    }

    if (err.name === "CastError") {
        error.message = `Resource not found. Invalid: ${err.path}`;
        error.statusCode = 400;
    }

    if (err.code === 11000) {
        error.message = `Duplicate ${Object.keys(err.keyValue).join(', ')} entered`;
        error.statusCode = 400;
    }

    if (err.name === "JsonWebTokenError") {
        error.message = "JSON Web Token is invalid. Try again";
        error.statusCode = 401;
    }

    if (err.name === "TokenExpiredError") {
        error.message = "JSON Web Token has expired. Try again";
        error.statusCode = 401;
    }

    return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error"
    });
};
