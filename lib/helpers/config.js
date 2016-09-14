"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInInnerConfig = exports.customConfig = exports.origConfig = undefined;

var _underscore = require("underscore");

var origConfig = exports.origConfig = require("../../../config/top_nav_config.json");

var flattenConfig = function flattenConfig() {
  var navHash = {};
  var flatten = function flatten(nestedConfig) {
    (0, _underscore.each)(nestedConfig, function (elem) {
      var subElem = elem.subElements;

      if (subElem && subElem.length) {
        navHash[elem.id] = (0, _underscore.omit)(elem, 'subElements');
        flatten(subElem);
      } else {
        navHash[elem.id] = elem;
      }
    });
  };

  flatten(origConfig);
  return navHash;
};

var flatConfig = flattenConfig();

var customConfig = exports.customConfig = function customConfig(id) {
  for (var _len = arguments.length, fields = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    fields[_key - 1] = arguments[_key];
  }

  if (fields.length === 0) {
    return flatConfig[id];
  }
  return _underscore.pick.apply(undefined, [flatConfig[id]].concat(fields));
};

var isInInnerConfig = exports.isInInnerConfig = function isInInnerConfig(category, id) {
  return origConfig.find(function (config) {
    if (category === config.id) {
      var subElements = config.subElements;
      var actualId = config.subElements.find(function (config) {
        return config.id === id;
      });

      return actualId ? actualId : undefined;
    }
  });
};