/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/tests/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/tests/**'],
  coverageDirectory: 'coverage',
  globalSetup: '<rootDir>/src/lib/test/setup-jest-global.ts',
  setupFiles: ['<rootDir>/src/lib/test/setup-jest.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/lib/test/setup-jest-env.ts'],
  clearMocks: true,
}
