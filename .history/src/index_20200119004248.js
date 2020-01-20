import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import './config/ReactotronConfig.js';

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
});



export default function App() {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Bruno Angst</Text>
    </View>
  );
}
