const { catchAsync } = require('../../../src/utils');

const mockRequest = () => ({});
const mockResponse = () => ({});
const mockNextFunction = () => jest.fn();

describe('catchAsync unit test', () => {
  it('should return middleware function', () => {
    const middleware = catchAsync(() => {});

    expect(middleware).toBeDefined();
    expect(middleware).toEqual(expect.any(Function));
  });

  it('should catch and pass errors to the next middleware', async () => {
    const errorMessage = 'Something went wrong!';
    const error = new Error(errorMessage);
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNextFunction();

    const fn = async (req, res, next) => {
      throw error;
    };

    const middleware = catchAsync(fn);
    await middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});
