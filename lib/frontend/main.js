"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _session_navigation = require("./session_navigation");

var _session_navigation2 = _interopRequireDefault(_session_navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainHeader = function () {
  function MainHeader() {
    _classCallCheck(this, MainHeader);

    this.$rootElem = (0, _jquery2.default)('.c-header');
    this.$promotionalHeader = this.$rootElem.find('.promotional-header');
    this.$menuOptions = (0, _jquery2.default)('.menu-options');
  }

  _createClass(MainHeader, [{
    key: "slidePromotionalHeader",
    value: function slidePromotionalHeader() {
      var _this = this;

      var $closeIcon = this.$promotionalHeader.find('.close-icon');

      if ($closeIcon.length) {
        $closeIcon.on('click', function () {
          _this.$promotionalHeader.slideUp();
        });
      }
    }
  }, {
    key: "attachHoverEventOnMenuItems",
    value: function attachHoverEventOnMenuItems() {
      var timer = void 0;
      var delay = 100;
      var contentMouseOut = false;

      this.$menuOptions.find('a[aria-haspopup="true"]').on({
        'mouseenter focusin': function mouseenterFocusin(e) {
          var $target = (0, _jquery2.default)(e.target);
          var actualDelay = contentMouseOut ? 0 : delay;
          contentMouseOut = false;
          timer = setTimeout(function () {
            $target.addClass('focused');
            $target.parent().find('.inner-menu .sub-nav').show();
          }, actualDelay);
        },
        'mouseleave focusout': function mouseleaveFocusout(e) {
          clearTimeout(timer);
          var $target = (0, _jquery2.default)(e.target);
          $target.removeClass('focused');
          $target.parent().find('.inner-menu .sub-nav').hide();
        }
      });

      this.$menuOptions.find('nav .inner-menu-content').on({
        'mouseenter': function mouseenter(e) {
          (0, _jquery2.default)(e.target).parents('li').find('.top-nav-link').addClass('focused');
          (0, _jquery2.default)(e.target).parents('.sub-nav').show();
        },
        'mouseleave': function mouseleave(e) {
          (0, _jquery2.default)(e.target).parents('li').find('.top-nav-link').removeClass('focused');
          (0, _jquery2.default)(e.target).parents('.sub-nav').hide();
          contentMouseOut = true;
        }
      });
    }
  }]);

  return MainHeader;
}();

var header = new MainHeader();

(0, _session_navigation2.default)();
header.attachHoverEventOnMenuItems();
if ((0, _jquery2.default)('header .promotional-header').length) {
  header.slidePromotionalHeader();
}

exports.default = MainHeader;