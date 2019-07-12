module.exports = function (config) {
  config.set({
    mutator: 'javascript',
    mutate: ['src/**/*.js'],
    packageManager: 'yarn',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'jest',
    transpilers: ['babel'],
    coverageAnalysis: 'off',
    babel: {
      optionsFile: '.babelrc',
    },
  });
};
