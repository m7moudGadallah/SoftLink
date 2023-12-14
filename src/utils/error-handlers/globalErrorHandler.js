/**
 * Sends error response in production environment.
 * @function sendErrorProd
 * @param {AppError} error
 * @param {import('express').Request} req
 * @param {import('express').Response<{success: false, message: string, error: {status: ('fail' | 'error'), message: string}}>} res
 * @returns {void}
 */
function sendErrorProd(error, req, res) {
  // Log error in console
  console.error('ERROR 💥', error);

  if (error.isOperational) {
    res.status(error.statusCode).json({
      success: false,
      message: 'Something went wrong!',
      error: {
        status: error.status,
        message: error.message,
      },
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: {
        status: 'error',
        message: 'Internal server error',
      },
    });
  }
}

/**
 * Sends error response in development environment.
 * @function sendErrorDev
 * @param {AppError} error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {void}
 */
function sendErrorDev(error, req, res) {
  // Log error in console
  res.status(error.statusCode).json({
    success: false,
    message: 'Something went wrong!',
    error: {
      status: error.status,
      message: error.message,
    },
  });
}

/**
 * Global error handler middleware.
 * @function
 * @param {AppError} error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
function globalErrorHandler(error, req, res, next) {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env?.NODE_ENV === 'production') sendErrorProd(error, req, res);
  else sendErrorDev(error, req, res);
}

module.exports = { globalErrorHandler };
