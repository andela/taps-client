module.exports = {
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
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/**/*.fixtures.ts',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  'collectCoverage': true,
  'collectCoverageFrom': ["client/src/**/*.jsx"],
  'coveragePathIgnorePatterns': ['/node_modules', '<rootDir>/src/index.tsx'],
  'setupTestFrameworkScriptFile': '<rootDir>/client/src/setupEnzyme.js'
};
