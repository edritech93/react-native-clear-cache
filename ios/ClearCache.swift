@objc(ClearCache)
class ClearCache: NSObject {
    
    @objc(getAppCacheSize:withRejecter:)
    func getAppCacheSize(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let cachPath: String = NSSearchPathForDirectoriesInDomains(.cachesDirectory, .userDomainMask, true)[0]
        let attrs = try? FileManager().attributesOfItem(atPath: cachPath)
        if (attrs != nil) {
            let size: Int = attrs?[.size] as! Int
            resolve(size)
        } else {
            resolve(0)
        }
    }
    
    @objc(clearAppCache:withRejecter:)
    func clearAppCache(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let cachPath: String = NSSearchPathForDirectoriesInDomains(.cachesDirectory, .userDomainMask, true)[0]
        let files: [String?] = FileManager().subpaths(atPath: cachPath) ?? []
        if (files.count > 0 && files[0] != nil)    {
            let path = cachPath + "/" + files[0]!
            try? FileManager().removeItem(atPath: path)
            resolve(true)
        } else {
            reject("error", "files is nil", false as? Error)
        }
    }
}
