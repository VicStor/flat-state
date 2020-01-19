"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIn = exports.setIn = exports.toPath = void 0;

var _ramda = require("ramda");

var _redux = require("redux");

var charCodeOfDot = '.'.charCodeAt(0);
var reEscapeChar = /\\(\\)?/g;
var rePropName = RegExp( // Match anything that isn't a dot or bracket.
'[^.[\\]]+' + '|' + // Or match property names within brackets.
'\\[(?:' + // Match a non-string expression.
'([^"\'][^[]*)' + '|' + // Or match strings (supports escaping characters).
'(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' + ')\\]' + '|' + // Or match "" as the space between consecutive dots or empty brackets.
'(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))', 'g');
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */

var stringToPath = function stringToPath(string) {
  var result = [];

  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push('');
  }

  string.replace(rePropName, function (match, expression, quote, subString) {
    var key = match;

    if (quote) {
      var _key = subString.replace(reEscapeChar, '$1');

      return result.push(_key);
    }

    if (expression) {
      var _key2 = expression.trim();

      var keyInt = parseInt(_key2, 10);

      if (_key2 == keyInt) {
        return result.push(keyInt);
      }

      throw Error("Key in ".concat(match, " should be integer"));
    }

    result.push(key);
  });
  return result;
};
/**
 * Converts `value` to a property path array.
 *
 * @since 4.0.0
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * toPath('a.b.c')
 * // => ['a', 'b', 'c']
 *
 * toPath('a[0].b.c')
 * // => ['a', 0, 'b', 'c']
 */


var toPath = function toPath(value) {
  if (Array.isArray(value)) {
    return value;
  }

  return stringToPath(value);
};

exports.toPath = toPath;
var setIn = (0, _ramda.curry)(function (path, val, obj) {
  return (0, _redux.compose)(function (lens) {
    return (0, _ramda.set)(lens, val, obj);
  }, _ramda.lensPath, toPath)(path);
});
exports.setIn = setIn;
var getIn = (0, _ramda.curry)(function (path, obj) {
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var val = (0, _redux.compose)(function (lens) {
    return (0, _ramda.view)(lens, obj);
  }, _ramda.lensPath, toPath)(path);
  return val === undefined ? def : val;
});
exports.getIn = getIn;
//# sourceMappingURL=set-utils.js.map