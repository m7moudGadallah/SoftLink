const { UrlService } = require('../../../src/services');
const { UrlModel } = require('../../../src/models');
const { AppError } = require('../../../src/utils');

// Mock mongoose.model function
jest.mock('mongoose', () => {
  const mockModel = {
    create: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  return {
    Schema: jest.fn(),
    model: jest.fn().mockReturnValue(mockModel),
  };
});

describe('UrlService class unit test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('shortenUrl', () => {
    const mockId = '31235fds35123';
    const originalUrl = 'https://google.com';

    it('should check if url is exists before to return it', async () => {
      UrlModel.findOne.mockResolvedValue({ _id: mockId });

      const returnedId = await UrlService.shortenUrl(originalUrl);

      expect(UrlModel.findOne).toHaveBeenCalledWith({ originalUrl });
      expect(returnedId).toBeDefined();
      expect(returnedId).toBe(mockId);
      expect(UrlModel.create).not.toHaveBeenCalled();
    });

    it('should create new document for new ulr', async () => {
      UrlModel.findOne.mockResolvedValue(null);
      UrlModel.create.mockResolvedValue({ _id: mockId });

      const returnedId = await UrlService.shortenUrl(originalUrl);

      expect(UrlModel.findOne).toHaveBeenCalledWith({ originalUrl });
      expect(UrlModel.findOne).toHaveReturnedWith(Promise.resolve(null));
      expect(UrlModel.create).toHaveBeenCalledWith({ originalUrl });
      expect(UrlModel.create).toHaveReturnedWith(
        Promise.resolve({ _id: mockId })
      );
      expect(returnedId).toBeDefined();
      expect(returnedId).toBe(mockId);
    });
  });

  describe('getOriginalUrl', () => {
    const mockId = '31235fds35123';
    const originalUrl = 'https://google.com';

    it('should return originalUrl', async () => {
      UrlModel.findByIdAndUpdate.mockResolvedValue({ originalUrl });

      const url = await UrlService.getOriginalUrl({ mockId });

      expect(url).toBeDefined();
      expect(url).toBe(originalUrl);
    });

    it('should throw an error if url is not found', async () => {
      UrlModel.findByIdAndUpdate.mockResolvedValue(null);

      await expect(UrlService.getOriginalUrl(mockId)).rejects.toThrow(
        expect.any(AppError)
      );
    });
  });
});
