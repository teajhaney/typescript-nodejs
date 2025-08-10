//custom error class

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError'; //this set the error type to API Error
  }
}

const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); //log the error stack

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    });
    //incase you wanna check for other eroor, do them here,
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'Error',
      message: 'ValidationError error',
    });
  } else {
    return res.status(500).json({
      status: 'Error',
      message: 'Internal Server Error',
    });
  }
};

export { APIError, asyncHandler, globalErrorHandler };
