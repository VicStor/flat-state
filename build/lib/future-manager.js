"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

var _constants = require("./constants");

var futureManager = function futureManager(store) {
  return function (next) {
    return function (_ref) {
      var type = _ref.type,
          Updater = _ref.Updater;

      if (type === _constants.FLAT_REDUX_ACTION_TYPE && (0, _utils.isFunction)(Updater)) {
        var state = store.getState();
        return next({
          type: type,
          Updater: Updater(state, store)
        });
      }

      return next({
        type: type,
        Updater: Updater
      });
    };
  };
};

var _default = futureManager;
exports.default = _default;
//# sourceMappingURL=future-manager.js.map