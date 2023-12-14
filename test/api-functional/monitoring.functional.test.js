const request = require('supertest');
const { createServer, closeServer } = require('../../src');

let server;

beforeAll(() => {
  server = createServer();
}, 5000);

afterAll(async () => {
  await closeServer();
}, 5000);

describe('Monitoring API', () => {
  describe('Server Monitoring [GET /]', () => {
    it('should return 200 OK', async () => {
      const response = await request(server).get('/');

      expect(response).toBeDefined();
      expect(response?.status).toBe(200);
      expect(response?.body).toBeDefined();
      expect(response?.body).toMatchObject({
        success: true,
        message: 'Server is live! 🚀`',
      });
    }, 5000);
  });

  describe('API Monitoring [GET /livez]', () => {
    it('should return 200 OK', async () => {
      const response = await request(server).get('/livez');

      expect(response).toBeDefined();
      expect(response?.status).toBe(200);
      expect(response?.body).toBeDefined();
      expect(response?.body).toMatchObject({
        success: true,
        message: 'API is live! 🚀',
      });
    }, 5000);
  });
});
