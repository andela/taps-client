module.exports = {
  'verbose': true,
  'roots': [
    '<rootDir>/client'
  ],
  'testRegex': '(roots/src/.*|(\\.|/)(test))\\.jsx?$',
  'moduleFileExtensions': [
    'js',
    'jsx',
    'json',
    'node'
  ],
  'moduleNameMapper': {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/client/src/tests/__mocks__/assetsTransformer.js',
    '\\.(css|less|scss)$': '<rootDir>/client/src/tests/__mocks__/assetsTransformer.js',
  },
  'collectCoverage': true,
  'collectCoverageFrom': ["client/src/**/*.{js,x}"],
  'testPathIgnorePatterns': [
    '<rootDir>/client/src/tests/__mocks__',
  ],
  'coveragePathIgnorePatterns': ['/node_modules', '<rootDir>/client/src/index.tsx', `'<rootDir>/client/src/tests'`],
  'snapshotSerializers': ['enzyme-to-json/serializer'],
  'setupTestFrameworkScriptFile': '<rootDir>/client/src/setupEnzyme.js'
};
