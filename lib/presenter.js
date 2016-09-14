"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headerPresenter = exports.isInInnerConfig = exports.customConfig = exports.origConfig = undefined;

var _config = require("./helpers/config");

var Config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var origConfig = Config.origConfig;
var customConfig = Config.customConfig;
var isInInnerConfig = Config.isInInnerConfig;
exports.origConfig = origConfig;
exports.customConfig = customConfig;
exports.isInInnerConfig = isInInnerConfig;
var headerPresenter = exports.headerPresenter = function headerPresenter(_ref) {
  var cookies = _ref.cookies;

  var isLogged = cookies['isLogged'];

  if (isLogged) {
    return { isLogged: isLogged };
  }

  return {};
};