"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.link = void 0;

var _index = require("./index");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var link = function link(connect) {
  return function (linkSetter) {
    return function (ReactComponent) {
      var stateToProps = function stateToProps(state, ownProps) {
        var linkConfig = (0, _utils.runIfFunc)(linkSetter, ownProps);
        return Object.entries(linkConfig).reduce(function (stateProps, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              propName = _ref2[0],
              lens = _ref2[1];

          return _objectSpread({}, stateProps, _defineProperty({}, propName, (0, _index.get)(lens, state)));
        }, {});
      };

      var dispatchToProps = function dispatchToProps(dispatch) {
        return {
          set: function set() {
            return dispatch(_index.set.apply(void 0, arguments));
          }
        };
      };

      return connect(stateToProps, dispatchToProps)(ReactComponent);
    };
  };
};

exports.link = link;
//# sourceMappingURL=connect-wrapper.js.map