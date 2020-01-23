"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "get", {
  enumerable: true,
  get: function get() {
    return _utils.get;
  }
});
Object.defineProperty(exports, "link", {
  enumerable: true,
  get: function get() {
    return _connectWrapper.link;
  }
});
exports.createStore = exports.set = exports.setState = void 0;

var _redux = require("redux");

var _futureManager = _interopRequireDefault(require("./future-manager"));

var _utils = require("./utils");

var _constants = require("./constants");

var _connectWrapper = require("./connect-wrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var setState = function setState() {
  return {
    type: _constants.FLAT_REDUX_ACTION_TYPE,
    Updater: _utils.set.apply(void 0, arguments)
  };
};

exports.set = exports.setState = setState;

var createStore = function createStore() {
  var initState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var middlewares = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        Updater = _ref.Updater;

    return type === _constants.FLAT_REDUX_ACTION_TYPE ? (0, _utils.runIfFunc)(Updater, state) : state;
  };

  var store = (0, _redux.createStore)(reducer, initState, _redux.applyMiddleware.apply(void 0, [_futureManager.default].concat(_toConsumableArray(middlewares))));

  store.set = function () {
    store.dispatch(setState.apply(void 0, arguments));
  };

  return store;
};

exports.createStore = createStore;
//# sourceMappingURL=index.js.map