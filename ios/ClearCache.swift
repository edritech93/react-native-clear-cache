@objc(ClearCache)
class ClearCache: NSObject {
    
    @objc(getAppCacheSize:withRejecter:)
    func getAppCacheSize(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let cachPath: String = NSSearchPathForDirectoriesInDomains(.cachesDirectory, .userDomainMask, true)[0]
        let attrs = try? FileManager().attributesOfItem(atPath: cachPath)
        if (attrs != nil) {
            resolve(attrs?[.size] ?? 0)
        } else {
            resolve(0)
        }
    }
    
    @objc(clearAppCache:withRejecter:)
    func clearAppCache(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let cachPath: String = NSSearchPathForDirectoriesInDomains(.cachesDirectory, .userDomainMask, true)[0]
        let files: [String]? = FileManager().subpaths(atPath: cachPath)
        if (files != nil)  {
            for p in files! {
                let path = cachPath + p
                if (FileManager().fileExists(atPath: path)) {
                    try? FileManager().removeItem(atPath: path)
                }
            }
            resolve(true)
        } else {
            reject("error", "files is nil", false as? Error)
        }
    }
}
