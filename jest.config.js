const path = require('path')

module.exports = {
  rootDir: path.join(__dirname),
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
  collectCoverageFrom: [
    '**/src/**/*.ts',
    '!**/tests/**',
    '!**/node_modules/**',
    '!src/index.ts',
    '!src/serviceWorker.ts',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./style-mock.js'),
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/src/setupTests.ts', 'jest-localstorage-mock'],
  coverageThreshold: {},
}
