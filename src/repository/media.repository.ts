import { Book, Album, ApiResult } from '../interfaces/media.interface';

class MediaRepository {
  public async getBooks(searchTerm: string): Promise<ApiResult<Book[]>> {
    let result: ApiResult<Book[]>;

    const books: Book[] = [
      {
        title: 'title',
        authors: ['authors'],
        mediaType: 'book',
      },
    ];

    result = {
      success: true,
      data: books,
      apiTime: 1,
    };
    return result;
  }

  public async getAlbums(searchTerm: string): Promise<ApiResult<Album[]>> {
    let result: ApiResult<Album[]>;

    const albums: Album[] = [
      {
        title: 'title',
        artists: ['artists'],
        mediaType: 'album',
      },
    ];

    result = {
      success: true,
      data: albums,
      apiTime: 1,
    };
    return result;
  }
}

export default MediaRepository;
