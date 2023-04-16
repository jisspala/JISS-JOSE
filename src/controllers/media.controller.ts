import { Request, Response } from 'express';
import MediaRepository from '../repository/media.repository';
import { FinalResult, Album, Book } from '../interfaces/media.interface';

class MediaController {
  private mediaRepository: MediaRepository = new MediaRepository();

  public getMedia = async (req: Request, res: Response): Promise<void> => {
    const searchTerm: string = req.query.q as string;

    try {
      const [albums, books] = await Promise.all([
        this.mediaRepository.getAlbums(searchTerm),
        this.mediaRepository.getBooks(searchTerm),
      ]);

      const finalResult: FinalResult = {
        books: [],
        albums: [],
      };

      if (albums && albums.success) {
        finalResult.albums = albums.data as Album[];
        albums.apiTime
          ? res.header('x-albums-api-response-time', albums.apiTime + 'ms')
          : '';
      }
      if (books && books.success) {
        finalResult.books = books.data as Book[];
        books.apiTime
          ? res.header('x-books-api-response-time', books.apiTime + 'ms')
          : '';
      }

      res.status(200).json(finalResult);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default MediaController;
