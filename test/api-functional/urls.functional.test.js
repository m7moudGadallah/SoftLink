const request = require('supertest');
const { createServer, closeServer } = require('../../src');
const { UrlModel } = require('../../src/models');

let server;

beforeAll(async () => {
  server = createServer();
  await UrlModel.deleteMany();
}, 5000);

afterEach(async () => {
  await UrlModel.deleteMany();
}, 3000);

afterAll(async () => {
  await closeServer();
}, 5000);

describe('URLs API', () => {
  describe('Shorten URL [POST /shorten]', () => {
    it('should return 200 Ok', async () => {
      const response = await request(server).post('/shorten').send({
        url: 'https://www.google.com',
      });

      expect(response).toBeDefined();
      expect(response?.status).toBe(200);
      expect(response?.body).toBeDefined();
      expect(response?.body).toMatchObject({
        success: true,
        message: expect.any(String),
        data: {
          shortUrl: expect.any(String),
        },
      });
      expect(response?.body?.data?.shortUrl).toBeDefined();
    });

    it('should return 400 Bad Request if url is not provided', async () => {
      const response = await request(server).post('/shorten').send();

      expect(response).toBeDefined();
      expect(response?.status).toBe(400);
      expect(response?.body).toBeDefined();
      expect(response?.body).toMatchObject({
        success: false,
        message: expect.any(String),
        error: {
          status: 'fail',
          message: expect.any(String),
        },
      });
    });

    it('should return 400 Bad Request if url is invalid', async () => {
      const response = await request(server).post('/shorten').send({
        url: 'invalid-url',
      });

      expect(response).toBeDefined();
      expect(response?.status).toBe(400);
      expect(response?.body).toBeDefined();
      expect(response?.body).toMatchObject({
        success: false,
        message: expect.any(String),
        error: {
          status: 'fail',
          message: expect.any(String),
        },
      });
    });
  });

  describe('Get Original URL [GET /:urlId]', () => {
    it('should return 301', async () => {
      const response = await request(server).post('/shorten').send({
        url: 'https://www.google.com',
      });

      expect(response).toBeDefined();
      expect(response?.status).toBe(200);
      expect(response?.body).toBeDefined();
      expect(response?.body).toMatchObject({
        success: true,
        message: expect.any(String),
        data: {
          shortUrl: expect.any(String),
        },
      });
      expect(response?.body?.data?.shortUrl).toBeDefined();

      const shortUrl = response?.body?.data?.shortUrl;

      const redirectResponse = await request(server).get(
        `/${shortUrl.split('/').pop()}`
      );

      expect(redirectResponse).toBeDefined();
      expect(redirectResponse?.status).toBe(302);
      expect(redirectResponse?.body).toMatchObject({});
    });

    it('should return 404 Not Found if urlId is invalid', async () => {
      const response = await request(server).get('/invalid-url-id');

      expect(response).toBeDefined();
      expect(response?.status).toBe(404);
      expect(response?.body).toBeDefined();
      expect(response?.body).toMatchObject({
        success: false,
        message: expect.any(String),
        error: {
          status: 'fail',
          message: expect.any(String),
        },
      });
    });
  });
});
