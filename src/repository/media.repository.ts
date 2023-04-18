import axios from 'axios';

import constants from '../utils/constants';
import { googleApi, appleApi } from '../config/external-apis';
import logger from '../utils/logger';

import {
  Book,
  Album,
  BookApi,
  AlbumApi,
  ApiResult,
  HealthResult,
} from '../interfaces/media.interface';

class MediaRepository {
  private maxResults = Number(process.env.MAX_RESULTS) || 5;
  private apiTimeout = Number(process.env.API_TIMEOUT) || 10000;

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
        .slice(0, this.maxResults)
        .map((book: BookApi) => ({
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors || [],
          mediaType: 'book',
        }))
        .sort((a: Book, b: Book) => a.title.localeCompare(b.title));

      result = {
        success: true,
        data: books,
        apiTime: apiTime,
      };
    } catch (err) {
      logger.error(err);
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
        .map((album: AlbumApi) => ({
          title: album.collectionName,
          artists: [album.artistName],
          mediaType: 'album',
        }))
        .sort((a: Album, b: Album) => a.title.localeCompare(b.title));

      result = {
        success: true,
        data: albums,
        apiTime,
      };
    } catch (err) {
      logger.error(err);

      result = {
        success: false,
        message: constants.API_ERROR,
      };
    }
    return result;
  }

  public async getHealth(): Promise<ApiResult<HealthResult>> {
    const healthResult: HealthResult = {};
    const testKeyword: string = constants.TEST_KEYWORD;
    let response;
    let apiTime: number;

    try {
      const url =
        `${appleApi}?term=${testKeyword}&limit=${this.maxResults}` as string;

      const apiStart: number = performance.now();
      response = await axios({
        url,
        method: 'get',
        timeout: this.apiTimeout,
      });
      const apiEnd: number = performance.now();
      apiTime = apiEnd - apiStart;

      if (response.data.results.length > 0) {
        healthResult.albumApi = constants.OK;
        healthResult.albumApiTime = apiTime;
      } else {
        healthResult.bookApi = constants['NOT-OK'];
      }
    } catch (err) {
      logger.error(err);
      healthResult.albumApi = constants['NOT-OK'];
    }

    try {
      const url = `${googleApi}?q==${testKeyword}&maxResults=${this.maxResults}`;

      const apiStart: number = performance.now();
      response = await axios({ url, method: 'get', timeout: this.apiTimeout });
      const apiEnd: number = performance.now();
      apiTime = apiEnd - apiStart;

      if (response.data.items.length > 0) {
        healthResult.bookApi = constants.OK;
        healthResult.bookApiTime = apiTime;
      } else {
        healthResult.bookApi = constants['NOT-OK'];
      }
    } catch (err) {
      logger.error(err);
      healthResult.bookApi = constants['NOT-OK'];
    }

    return {
      success: true,
      data: healthResult,
    };
  }
}

export default MediaRepository;
