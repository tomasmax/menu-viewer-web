const nextJest = require('next/jest')

const customJestConfig = {
  /* With custom configuration */
}

const createJestConfig = nextJest({
  dir: './',
})(customJestConfig)

module.exports = async () => {
  // Create Next.js jest configuration presets
  const jestConfig = await createJestConfig()

  const setupFilesAfterEnv = ['./test/jest.setup.js']
  // Custom `moduleNameMapper` configuration
  const moduleNameMapper = {
    ...jestConfig.moduleNameMapper,
    '^@components(.*)$': '<rootDir>/components$1',
    '^@pages(.*)$': '<rootDir>/pages$1',
    '^@/(.*)$': '<rootDir>/$1',
  }

  const testEnvironment = 'jest-environment-jsdom'

  return {
    ...jestConfig,
    setupFilesAfterEnv,
    moduleNameMapper,
    testEnvironment,
  }
}
