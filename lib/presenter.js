"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Config = require("../config/top_nav_config.json");

var presenter = function presenter(_ref, page) {
  var _ref$cookies = _ref.cookies;
  var cookies = _ref$cookies === undefined ? {} : _ref$cookies;
  var _ref$topNav = _ref.topNav;
  var topNav = _ref$topNav === undefined ? true : _ref$topNav;

  var isLogged = cookies['isLogged'];

  if (cookies) {
    page.set({ isLogged: isLogged });
  }

  if (topNav) {
    page.set({ origConfig: Config });
  } else {
    page.set({ origConfig: [] });
  }
};

exports.default = presenter;