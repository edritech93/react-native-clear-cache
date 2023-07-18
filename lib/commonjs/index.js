"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearAppCache = clearAppCache;
exports.getAppCacheSize = getAppCacheSize;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-clear-cache' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const ClearCache = _reactNative.NativeModules.ClearCache ? _reactNative.NativeModules.ClearCache : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function getAppCacheSize() {
  return ClearCache.getAppCacheSize();
}
function clearAppCache() {
  return ClearCache.clearAppCache();
}
//# sourceMappingURL=index.js.map