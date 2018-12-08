import "core-js/shim"; // included < Stage 4 proposals
import "regenerator-runtime/runtime";

import './promise-extensions';

import Application from './browser/application';
import AppEnv from './app-env';

// pull in static files
//
// the global stylehseet
import '../static/index.less';

// all images
const allImages = require.context('../static', true, /\.png$/);
import Utils from './flux/models/utils';
Utils.allImageContext = allImages;


// browser/main.js

// Similar as in AppEnv.js
const options = {
  resourcePath: "",
  configDirPath: "",
  version: "",
  devMode: false,
  specMode: false,
};

const setupErrorLogger = (args = {}) => {
  const ErrorLogger = require('./error-logger');
  const errorLogger = new ErrorLogger({
    inSpecMode: args.specMode,
    inDevMode: args.devMode,
    resourcePath: args.resourcePath,
  });
  process.on('uncaughtException', errorLogger.reportError);
  process.on('unhandledRejection', errorLogger.reportError);
  return errorLogger;
};
global.errorLogger = setupErrorLogger({});


global.application = new Application();

global.application.start(options).then(() => {
    global.AppEnv = new AppEnv();
    require('./global/mailspring-exports');
    global.AppEnv.startRootWindow();
})
