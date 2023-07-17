import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-clear-cache' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ClearCache = NativeModules.ClearCache
  ? NativeModules.ClearCache
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function getAppCacheSize(): Promise<number> {
  return ClearCache.getAppCacheSize();
}

export function clearAppCache(): Promise<number> {
  return ClearCache.clearAppCache();
}


