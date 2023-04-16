import MediaRepository from '../../../repository/media.repository';
import { Book, Album, ApiResult } from '../../../interfaces/media.interface';

describe('MediaRepository', () => {
  let mediaRepo: MediaRepository;

  beforeEach(() => {
    // create new instance of MediaRepository before each test
    mediaRepo = new MediaRepository();
  });

  afterEach(() => {
    // clear all mocks after each test
    jest.clearAllMocks();
  });

  describe('getBooks', () => {
    it('should return a list of books when API call is successful', async () => {
      const result: ApiResult<Book[]> = await mediaRepo.getBooks('test');
      expect(result.success).toBe(true);
      expect(result.data?.length).toBe(5);
      expect(result.apiTime).toBeGreaterThan(0);
    });
    it('should return a list of albums when API call is successful', async () => {
      const result: ApiResult<Album[]> = await mediaRepo.getAlbums('test');
      expect(result.success).toBe(true);
      expect(result.data?.length).toBe(5);
      expect(result.apiTime).toBeGreaterThan(0);
    });
  });
});
