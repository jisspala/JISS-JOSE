import { Router } from 'express';
import MediaController from '../controllers/media.controller';
import MediaMiddleware from '../middlewares/media.middleware';

class MediaRoute {
  private router: Router;
  private mediaController: MediaController = new MediaController();
  private mediaMiddleware: MediaMiddleware = new MediaMiddleware();
  private routeVersion1 = 'v1';

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `/${this.routeVersion1}/media`,
      this.mediaMiddleware.validate,
      this.mediaController.getMedia
    );
    this.router.get(
      `/${this.routeVersion1}/health`,
      this.mediaController.getHealth
    );
  }

  public getRouter() {
    return this.router;
  }
}

export default MediaRoute;
