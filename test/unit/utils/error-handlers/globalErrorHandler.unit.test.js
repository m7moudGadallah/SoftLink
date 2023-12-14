const { AppError } = require('../../../../src/utils/appError');
const { globalErrorHandler } = require('../../../../src/utils/error-handlers');

const mockRequest = () => ({});
const mockResponse = () => {
  const res = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};
const mockNextFunction = () => jest.fn();

describe('globalErrorHandler unit test', () => {
  // Save original environment
  const originalEnv = process.env.NODE_ENV;
  let req;
  let res;
  let next;

  beforeEach(() => {
    process.env = { ...originalEnv };
    req = mockRequest();
    res = mockResponse();
    next = mockNextFunction();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should send error response in development environment', () => {
    process.env.NODE_ENV = 'development';

    const error = new Error('Test Error');
    error.statusCode = 400;

    globalErrorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Something went wrong!',
      error: {
        status: error.status,
        message: error.message,
      },
    });
  });

  it('should send error response in production environment for operational errors', () => {
    process.env.NODE_ENV = 'production';

    const error = new AppError('Test error', 400);

    globalErrorHandler(error, req, res, next);

    expect(res?.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Something went wrong!',
      error: {
        status: error.status,
        message: error.message,
      },
    });
  });

  it('should send error response in production environment for non-operational errors', () => {
    process.env.NODE_ENV = 'production';
    const error = new Error('Inter server error');
    error.statusCode = 500;

    globalErrorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Something went wrong!',
      error: {
        status: 'error',
        message: 'Internal server error',
      },
    });
  });
});
