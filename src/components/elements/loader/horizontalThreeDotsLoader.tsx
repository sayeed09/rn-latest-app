import ThreeXAxisDots from '@assets//images/loaders/three-xaxis-dots';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const horizontalThreeDotsLoader = (): React.ReactElement => (
  <SafeAreaView style={styles.container}>
    <ThreeXAxisDots />
  </SafeAreaView>
);

export default horizontalThreeDotsLoader;
