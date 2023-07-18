package com.clearcache

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File

class ClearCacheModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  @ReactMethod
  fun getAppCacheSize(promise: Promise) {
    var fileSize: Long = 0
    val filesDir = reactApplicationContext.filesDir
    val cacheDir = reactApplicationContext.cacheDir
    fileSize += getDirSize(filesDir)
    fileSize += getDirSize(cacheDir)
    if (fileSize > 0) {
      promise.resolve(fileSize.toInt())
    } else {
      promise.resolve(0)
    }
  }

  @ReactMethod
  fun clearAppCache(promise: Promise) {
    reactApplicationContext.deleteDatabase("webview.db")
    reactApplicationContext.deleteDatabase("webview.db-shm")
    reactApplicationContext.deleteDatabase("webview.db-wal")
    reactApplicationContext.deleteDatabase("webviewCache.db")
    reactApplicationContext.deleteDatabase("webviewCache.db-shm")
    reactApplicationContext.deleteDatabase("webviewCache.db-wal")
    clearCacheFolder(reactApplicationContext.filesDir, System.currentTimeMillis())
    clearCacheFolder(reactApplicationContext.cacheDir, System.currentTimeMillis())
    promise.resolve(true)
  }

  private fun getDirSize(dir: File?): Long {
    if (dir == null) {
      return 0
    }
    if (!dir.isDirectory) {
      return 0
    }
    var dirSize: Long = 0
    val files = dir.listFiles()
    for (file in files!!) {
      if (file.isFile) {
        dirSize += file.length()
      } else if (file.isDirectory) {
        dirSize += file.length()
        dirSize += getDirSize(file)
      }
    }
    return dirSize
  }

  private fun clearCacheFolder(dir: File?, curTime: Long): Int {
    var deletedFiles = 0
    if (dir != null && dir.isDirectory) {
      try {
        for (child in dir.listFiles()) {
          if (child.isDirectory) {
            deletedFiles += clearCacheFolder(child, curTime)
          }
          if (child.lastModified() < curTime) {
            if (child.delete()) {
              deletedFiles++
            }
          }
        }
      } catch (e: Exception) {
        e.printStackTrace()
      }
    }
    return deletedFiles
  }

  companion object {
    const val NAME = "ClearCache"
  }

  override fun getName(): String {
    return NAME
  }
}
