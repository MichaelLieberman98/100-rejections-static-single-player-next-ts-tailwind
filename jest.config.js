const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/components/$1',

    '^@/pages/(.*)$': '<rootDir>/pages/$1',

    '^@/util/(.*)$': '<rootDir>/util/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    "node_modules/(?!(node-fetch)/)",
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
}

// createJestConfig is exported this way to ensure tht next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
