import supertest, { Response } from 'supertest';
import App from '../../app';
import constants from '../../utils/constants';

jest.setTimeout(60000);

describe('Media Search Api End to End Testing', () => {
  const app = new App();
  app.start();
  const request: supertest.SuperTest<supertest.Test> = supertest(
    app.getServer()
  );

  describe('[GET] /media', () => {
    it('should provide Medias  with propper message', async () => {
      const res: Response = await request.get('/v1/media?q=test');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('books');
      expect(res.body).toHaveProperty('albums');
      expect(res.body.books.length).toBeGreaterThan(0);
      expect(res.body.albums.length).toBeGreaterThan(0);
    });

    it('should provide statusCode 400 with proper message for invalid query', async () => {
      const res: Response = await request.get('/v1/media?q=F****Ftest');
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual(constants.INVALID_TERM);
    });
  });
});
