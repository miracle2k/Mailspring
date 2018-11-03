import 'babel-polyfill';
import './promise-extensions';

import '../static/index.less';

import Application from './browser/application';
import AppEnv from './app-env';

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
