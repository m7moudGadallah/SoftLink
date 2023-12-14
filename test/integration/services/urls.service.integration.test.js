const { UrlService } = require('../../../src/services');
const { UrlModel } = require('../../../src/models');
const { DB } = require('../../../src/config');
const { AppError } = require('../../../src/utils');

beforeAll(async () => {
  await DB.connect();
  await UrlModel.deleteMany();
}, 5000);

afterEach(async () => {
  await UrlModel.deleteMany();
}, 3000);

afterAll(async () => {
  await DB.disConnect();
}, 5000);

describe('UrlService class integration testing', () => {
  const originalUrl = 'https://google.com';
  describe('shortenUrl', () => {
    it('should create new shorten url', async () => {
      const id = await UrlService.shortenUrl(originalUrl);

      expect(id).toBeDefined();
      await expect(UrlModel.countDocuments()).resolves.toBe(1);
    }, 6000);

    it('should return shorten url id without it creating new document if it exists before', async () => {
      await UrlModel.create({ originalUrl });
      const id = await UrlService.shortenUrl(originalUrl);

      expect(id).toBeDefined();
      await expect(UrlModel.countDocuments()).resolves.toBe(1);
    }, 6000);
  });

  describe('getOriginalUrl', () => {
    it('should throw an error if url with passed id is not found', async () => {
      await expect(
        UrlService.getOriginalUrl('6579fbbd652bb864b4623463')
      ).rejects.toThrow(expect.any(AppError));
    }, 6000);

    it('should return original url', async () => {
      const { _id } = await UrlModel.create({ originalUrl });

      const url = await UrlService.getOriginalUrl(_id);
      const { clicks } = await UrlModel.findById(_id);

      expect(url).toBeDefined();
      expect(url).toBe(originalUrl);
      expect(clicks).toBe(1);
    }, 6000);
  });
});
