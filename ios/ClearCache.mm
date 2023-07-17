#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ClearCache, NSObject)

RCT_EXTERN_METHOD(getAppCacheSize:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(clearAppCache:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

@end
