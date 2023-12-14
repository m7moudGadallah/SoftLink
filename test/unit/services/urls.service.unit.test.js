const { UrlService } = require('../../../src/services');
const { UrlModel } = require('../../../src/models');

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
});
