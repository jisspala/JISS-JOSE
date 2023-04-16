import { Book, Album, ApiResult } from '../interfaces/media.interface';
import constants from '../utils/constants';
import { googleApi, appleApi } from '../config/external-apis';
import axios from 'axios';

class MediaRepository {
  private maxResults = Number(process.env.MAX_RESULTS) | 5;
  private apiTimeout = Number(process.env.API_TIMEOUT) | 10000;

  public async getBooks(searchTerm: string): Promise<ApiResult<Book[]>> {
    let result: ApiResult<Book[]>;
    let response;

    const url = `${googleApi}?q==${searchTerm}&maxResults=${this.maxResults}`;
    let apiTime: number;

    try {
      const apiStart: number = performance.now();

      response = await axios({ url, method: 'get', timeout: this.apiTimeout });

      const apiEnd: number = performance.now();
      apiTime = apiEnd - apiStart;

      const books = response.data.items
        .map((book: any) => ({
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors || [],
          mediaType: 'book',
        }))
        .sort((a: any, b: any) => a.title.localeCompare(b.title));

      result = {
        success: true,
        data: books,
        apiTime: apiTime,
      };
    } catch (err) {
      console.log(err);
      result = {
        success: false,
        message: constants.API_ERROR,
      };
    }

    return result;
  }

  public async getAlbums(searchTerm: string): Promise<ApiResult<Album[]>> {
    let result: ApiResult<Album[]>;
    let response;

    const url = `${appleApi}?term=${searchTerm}&limit=${this.maxResults}`;

    let apiTime: number;
    try {
      const apiStart: number = performance.now();

      response = await axios({ url, method: 'get', timeout: this.apiTimeout });

      const apiEnd: number = performance.now();
      apiTime = apiEnd - apiStart;

      const albums = response.data.results
        .slice(0, this.maxResults)
        .map((album: any) => ({
          title: album.collectionName,
          artists: [album.artistName],
          mediaType: 'album',
        }))
        .sort((a: any, b: any) => a.title.localeCompare(b.title));

      result = {
        success: true,
        data: albums,
        apiTime,
      };
    } catch (err) {
      result = {
        success: false,
        message: constants.API_ERROR,
      };
    }
    return result;
  }
}

export default MediaRepository;
