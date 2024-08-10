module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/jest.mock.js',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/',
  ],
};