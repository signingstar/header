"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Config = require("../config/top_nav_config.json");

var presenter = function presenter(_ref, page) {
  var cookies = _ref.cookies;
  var topNav = _ref.topNav;

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