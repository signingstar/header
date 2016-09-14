'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addReferrer = function addReferrer() {
  var selectors = '#user-signin a, #user-signup a, #user-signout a';
  var currentHref = location.href;

  currentHref = currentHref.replace(/[?&]ref_url=([^&]*)?/, '');

  var referrer = 'ref_url=' + encodeURIComponent(currentHref);

  (0, _jquery2.default)(selectors).each(function () {
    var urlAppender = /\?/.test(this.href) ? '&' : '?';
    var refUrlString = urlAppender + referrer;
    this.href += refUrlString;
  });
};

exports.default = addReferrer;