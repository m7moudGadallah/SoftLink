const { AppError } = require('../../../../src/utils/appError');
const {
  undefinedRoutesErrorHandler,
} = require('../../../../src/utils/error-handlers');

describe('undefinedRoutesErrorHandler unit test', () => {
  it('should call next middleware', () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    undefinedRoutesErrorHandler(req, res, next);

    const error = next.mock.calls[0][0];

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect(error?.statusCode).toBe(404);
    expect(error.message).toMatch("Can't find");
  });
});
