import express, { Application } from 'express';
import MediaRoute from './routes/media.route';
import { PORT, HOST_NAME } from './config';

import swaggerJSdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    const mediaRoute: MediaRoute = new MediaRoute();
    this.app.use('/', mediaRoute.getRouter());
  }

  public start(): void {
    this.app.listen(3000, () => {
      console.info(`App is started as  http://${HOST_NAME}:${PORT}`);
      console.info(
        `API doc is available at  http://${HOST_NAME}:${PORT}/api-docs`
      );
    });
  }

  public getServer(): Application {
    return this.app;
  }

  private initializeSwagger(): void {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };
    const specs = swaggerJSdoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }
}
export default App;
