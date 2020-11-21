const path = require('path')

module.exports = {
  rootDir: path.join(__dirname),
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
  collectCoverageFrom: [
    '**/src/**/*.ts',
    '!**/__tests__/**',

    '!**/node_modules/**',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./style-mock.js'),
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/src/setupTests.ts'],
  coverageThreshold: {},
}
