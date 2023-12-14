const { AppError } = require('../../../src/utils');

describe('AppError class unit test', () => {
  it('should create instance from AppError', () => {
    const error = new AppError();

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(AppError);
  });

  it('should have the correct properties with default values', () => {
    const error = new AppError();

    expect(error).toBeDefined();
    expect(error?.message).toMatch('Something went wrong');
    expect(error?.statusCode).toBe(500);
    expect(error?.isOperational).toBeTruthy();
    expect(error?.status).toBe('error');
  });

  it('should have the correct properties, when arguments are passed to constructor', () => {
    const errorMessage = 'Some missing fields';
    const statusCode = 400;

    const error = new AppError(errorMessage, statusCode);

    expect(error).toBeDefined();
    expect(error?.message).toBe(errorMessage);
    expect(error?.statusCode).toBe(statusCode);
    expect(error?.status).toBe('fail');
    expect(error?.isOperational).toBeTruthy();
  });

  it('should capture the stack trace', () => {
    const error = new AppError();

    expect(error?.stack).toBeDefined();
  });
});
