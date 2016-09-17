'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Config = require("../config/top_nav_config.json");

var presenter = function presenter(_ref, page) {
  var _ref$cookies = _ref.cookies;
  var cookies = _ref$cookies === undefined ? {} : _ref$cookies;
  var _ref$topNav = _ref.topNav;
  var topNav = _ref$topNav === undefined ? true : _ref$topNav;
  var _ref$scriptFile = _ref.scriptFile;
  var scriptFile = _ref$scriptFile === undefined ? 'core' : _ref$scriptFile;
  var modules = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var jsAsset = modules.jsAsset;
  var logger = modules.logger;


  if (!page) {
    if (logger) {
      logger.error('Layout Presenter: Page object not passed');
    }

    return;
  }

  var isLogged = cookies['isLogged'];

  if (cookies) {
    page.set({ isLogged: isLogged });
  }

  if (jsAsset) {
    page.set({ corejs: jsAsset(scriptFile) });
  }

  if (topNav) {
    page.set({ origConfig: Config });
  } else {
    page.set({ origConfig: [] });
  }

  return { isLogged: isLogged };
};

exports.default = presenter;