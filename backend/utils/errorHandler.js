class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Helpful for debugging: excludes constructor call from stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
