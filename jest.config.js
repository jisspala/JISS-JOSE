module.exports = {
  testTimeout: 20000,
  preset: 'ts-jest',
  roots: ['./src/tests'],
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
};
