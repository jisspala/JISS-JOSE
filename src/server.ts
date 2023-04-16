import App from './app';

const app = new App();
app.start();

process.on('uncaughtException', (error) => {
  console.error(error, 'uncaughtException');
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error(error, 'unhandledRejection');
  process.exit(1);
});
