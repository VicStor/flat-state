"use strict";

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _index = require("./index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { runIfFunc } from './utils.js'
var store = (0, _index.createStore)({}, [_reduxLogger.default]);
store.set('a.b', Promise.resolve('b'));
setTimeout(function () {
  store.set('a.b', function (b) {
    return Promise.resolve(b.data + 'b');
  });
}, 10);
//# sourceMappingURL=debug.js.map