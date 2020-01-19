"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "get", {
  enumerable: true,
  get: function get() {
    return _setUtils.getIn;
  }
});
exports.set = exports.log = exports.runIfFunc = exports.isFunction = void 0;

var _ramda = require("ramda");

var _setUtils = require("./set-utils");

var _index = require("./index");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var isString = (0, _ramda.is)(String);
var isFunction = (0, _ramda.is)(Function);
exports.isFunction = isFunction;
var isPromise = (0, _ramda.is)(Promise);

var runIfFunc = function runIfFunc(maybeFunc) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return isFunction(maybeFunc) ? maybeFunc.apply(void 0, args) : maybeFunc;
};

exports.runIfFunc = runIfFunc;
var log = (0, _ramda.curry)(function (message, val) {
  console.log("".concat(message, ": "), val);
  return val;
});
exports.log = log;
var setByPath = (0, _ramda.curry)(function (path, value, obj) {
  var store = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var currentVal = (0, _setUtils.getIn)(path, obj);
  var newVal = runIfFunc(value, currentVal);
  return isPromise(newVal) ? setByPromise(path, newVal, obj, store) : (0, _setUtils.setIn)(path, newVal, obj);
});
var setByObj = (0, _ramda.curry)(function (valuesObj, obj) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return Object.entries(valuesObj).reduce(function (resultObj, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var currentVal = (0, _setUtils.getIn)(key, resultObj);
    var newVal = runIfFunc(value, currentVal);
    return isPromise(newVal) ? setByPromise(key, newVal, resultObj, store) : (0, _setUtils.setIn)(key, newVal, resultObj);
  }, obj);
});

var set = function set() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var maybePath = args[0];

  if (isString(maybePath)) {
    return setByPath.apply(void 0, args);
  }

  return setByObj.apply(void 0, args);
};

exports.set = set;

function setByPromise(path, promise, obj, store) {
  promise.then(function (data) {
    var action = (0, _index.set)(path, {
      error: null,
      isLoading: false,
      data: data
    });
    store.dispatch(action);
  }).catch(function (error) {
    var action = (0, _index.set)(path, {
      error: error,
      isLoading: false,
      data: null
    });
    store.dispatch(action);
  });
  return set(path, {
    error: null,
    isLoading: true,
    data: (0, _setUtils.getIn)("".concat(path, ".data"), store.getState(), null)
  }, obj, store);
}
//# sourceMappingURL=utils.js.map