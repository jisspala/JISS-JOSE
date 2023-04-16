import {
  Book,
  Album,
  ApiResult,
  HealthResult,
} from '../interfaces/media.interface';
import constants from '../utils/constants';
import { googleApi, appleApi } from '../config/external-apis';
import axios from 'axios';
import logger from '../utils/logger';

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
      logger.log(err);
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

  public async getHealth(): Promise<ApiResult<HealthResult>> {
    let ApiResult: ApiResult<HealthResult>;

    let result: HealthResult = {};
    let response;
    let apiTime: number;

    try {
      const url = `${appleApi}?term=test&limit=${this.maxResults}` as string;

      const apiStart: number = performance.now();

      response = await axios({
        url,
        method: 'get',
        timeout: this.apiTimeout,
      });

      const apiEnd: number = performance.now();
      apiTime = apiEnd - apiStart;
      if (response.data.results.length === this.maxResults) {
        result.albumApi = constants.OK;
        result.albumApiTime = apiTime;
      }
    } catch (err) {
      result.albumApi = constants['NOT-OK'];
    }
    try {
      const url = `${googleApi}?q==test&maxResults=${this.maxResults}`;

      const apiStart: number = performance.now();

      response = await axios({ url, method: 'get', timeout: this.apiTimeout });

      const apiEnd: number = performance.now();
      apiTime = apiEnd - apiStart;

      if (response.data.items.length === this.maxResults) {
        result.bookApi = constants.OK;
        result.bookApiTime = apiTime;
      }
    } catch (err) {
      logger.log(err);
      result.bookApi = constants['NOT-OK'];
    }

    ApiResult = {
      success: true,
      data: result,
    };
    return ApiResult;
  }
}

export default MediaRepository;
