import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { getAppCacheSize, clearAppCache } from 'react-native-clear-cache';

export default function App() {
  const [cacheSize, setCacheSize] = useState<number>(0);

  useEffect(() => {
    _handleGetAppCache();
  }, []);

  const _handleGetAppCache = async () => {
    const appCache: any = await getAppCacheSize().catch((error) => {
      console.log('getAppCacheSize ERROR : ', error);
      throw error;
    });
    setCacheSize(appCache);
  };

  const _handleClearAppCache = async () => {
    await clearAppCache().catch((error) => {
      console.log('clearAppCache ERROR : ', error);
      throw error;
    });
    _handleGetAppCache();
    Alert.alert('Clear Cache', 'Successfully', [
      { text: 'OK', onPress: () => {} },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text>{'Example of\nreact-native-clear-cache\n\n'}</Text>
      <Text>{`App Cache Size : ${cacheSize}\n\n`}</Text>
      <Button title={'App Cache Size'} onPress={_handleGetAppCache} />
      <Button title={'Clear Cache Size'} onPress={_handleClearAppCache} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
});
