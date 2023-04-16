export interface Constants {
  INVALID_TERM: string;
  DEVELOPMENT: string;
  PRODUCTION: string;
}

export interface Status {
  success: boolean;
  message: string;
}

export interface Book {
  title: string;
  authors: string[];
  mediaType: 'book';
}
export interface Album {
  title: string;
  artists: string[];
  mediaType: 'album';
}

export interface ApiResult<T> {
  success: boolean;
  message?: string;
  data?: T;
  apiTime?: number;
}

export interface FinalResult {
  books: Book[] | [];
  albums: Album[] | [];
}
