import { Request, Response } from 'express';
import MediaController from '../../../controllers/media.controller';
import MediaRepository from '../../../repository/media.repository';

const mockAlbums = {
  success: true,
  data: [{ id: 1, name: 'Album 1' }],
  apiTime: 1,
};

const mockBooks = {
  success: true,
  data: [{ id: 1, name: 'Book 1' }],
  apiTime: 1,
};

const getBooks = jest.fn().mockResolvedValueOnce(mockBooks);
const getAlbums = jest.fn().mockResolvedValueOnce(mockAlbums);

const mockResponse: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  header: jest.fn(),
};

afterEach(() => {
  jest.resetAllMocks();
});

let mockRequest: Partial<Request> = {
  query: { q: 'search term' },
};

jest.mock('../../../repository/media.repository', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getBooks: getBooks,
      getAlbums: getAlbums,
    };
  });
});

describe('MediaController Testing', () => {
  describe('Encode', () => {
    it('should return media search results ', async () => {
      const mediaController: MediaController = new MediaController();
      const mediaRepository: MediaRepository = new MediaRepository();
      mockRequest = {
        query: { q: 'search term' },
      };
      mediaController.getMedia(
        mockRequest as Request,
        mockResponse as Response
      );
      expect(mediaRepository.getBooks).toHaveBeenCalledTimes(1);
      expect(mediaRepository.getAlbums).toHaveBeenCalledTimes(1);
      expect(mediaRepository.getAlbums).toHaveBeenCalledWith('search term');
      expect(mediaRepository.getBooks).toHaveBeenCalledWith('search term');
    });
  });
});
