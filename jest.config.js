module.exports = {
  preset: 'ts-jest',
  roots: ['./src/tests/unit'],
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
};
