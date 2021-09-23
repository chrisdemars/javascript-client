'use strict';
// Comment the next two lines if you want to run with Chrome instead of Chromium
const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  // base path, that will be used to resolve files and exclude
  basePath: '../src',

  // load tap integration
  frameworks: [
    'tap', 'webpack'
  ],

  // Run on Chrome Headless
  browsers: [
    'ChromeHeadless'
  ],

  // list of files / patterns to load in the browser
  files: [
    // Uncomment to run a particular UTs:
    // '**/listeners/__tests__/browser.spec.js',
    // Run browser UTs. Commons and Node UTs are run with `test-node` npm script
    '*/**/__tests__/**/browser.spec.js',
    {
      pattern: 'engine/__tests__/engine/mocks/murmur3*.csv',
      watched: false,
      included: false,
      served: true,
      nocache: true
    },
    {
      pattern: 'engine/__tests__/matchers/mocks/regex.txt',
      watched: false,
      included: false,
      served: true,
      nocache: true
    }
  ],

  // list of files / patterns to exclude
  exclude: [
    '*/**/__tests__/**/node.spec.js',
    '*/**/__tests__/**/node_redis.spec.js',
    '*/**/__tests__/**/*.node.spec.js',
    '*/**/__tests__/**/inputValidation/*.spec.js'
  ],

  // prepare code for the browser using webpack
  preprocessors: {
    '*/**/__tests__/**/*.spec.js': ['webpack'],
  },

  webpack: {
    mode: 'production', // Use 'development' to debug with not minified bundle
    devtool: false, // Use 'inline-source-map' to debug with source map

    target: ['web', 'es5'], // 'web' => resolve.mainFields === ['browser', 'module', 'main']
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                'useBuiltIns': false, // default value: don't add core-js or babel polyfills
                'targets': {
                  'ie': '10',
                  'node': '6'
                },
                'loose': true
              }]],
              plugins: [['@babel/plugin-transform-runtime', {
                // default values
                'absoluteRuntime': false,
                'corejs': false,
                'regenerator': true,
                'useESModules': false,
                'helpers': true
              }]]
            }
          }
        }
      ]
    },
    plugins: [
      new NodePolyfillPlugin()
    ],
    resolve: {
      fallback: {
        fs: false
      }
    }
  },

  webpackServer: {
    noInfo: true
  },

  // web server port
  port: 9876,

  // make IE happy (in theory not required)
  // https://msdn.microsoft.com/en-us/library/ff955275(v=vs.85).aspx
  customHeaders: [{
    match: 'html',
    name: 'X-UA-Compatible',
    value: 'IE=edge'
  }, {
    match: 'csv$',
    name: 'Content-Type',
    value: 'text/plain'
  }],

  // Which plugins to enable
  plugins: [
    'karma-webpack',
    'karma-tap',
    'karma-chrome-launcher'
  ],

  browserConsoleLogOptions: {
    terminal: false
  },

  // Continuous Integration mode
  // if true, it capture browsers, run tests and exit
  singleRun: true,

  colors: true,

  /**
   * @WARNING in local mode, murmur verification takes forever (chrome tested),
   *          so I keep this only to be used by Chrome Headless.
   */
  browserDisconnectTolerance: 1,
  browserNoActivityTimeout: 60 * 60 * 1000,
  reportSlowerThan: 30,
};
